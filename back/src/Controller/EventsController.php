<?php

namespace App\Controller;

use App\Entity\Events;
use App\Repository\EventsRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use JMS\Serializer\SerializationContext;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Cache\TagAwareCacheInterface;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class EventsController extends AbstractController
{
    #[Route('/events/{id}', name: 'events.get', methods: ['GET'])]
    public function getEvents(
        int $id,
        EventsRepository $repository,
        SerializerInterface $serializer,
        Request $request,
        CacheInterface $cache
    ): JsonResponse {
        $cacheKey = "events.get/{$id}";

        $events = $cache->get($cacheKey, function (ItemInterface $item) use ($repository, $id) {
            $item->expiresAfter(3600);

            return $repository->findActive($id);
        });

        if (!$events || !$events->getStatus()) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $context = SerializationContext::create()->setGroups(["getEvents"]);
        $jsonEvents = $serializer->serialize($events, 'json', $context);

        //Client-side cache
        $etag = md5($jsonEvents);

        if ($request->headers->get('If-None-Match') === $etag) {
            return new JsonResponse(null, Response::HTTP_NOT_MODIFIED);
        }

        return new JsonResponse($jsonEvents, Response::HTTP_OK, ['ETag' => $etag], true);
    }

    #[Route('/events', name: 'events.get_all', methods: ['GET'])]
    public function getAllEvents(
        SerializerInterface $serializer,
        EventsRepository $repository,
        Request $request,
        TagAwareCacheInterface $cache
    ): JsonResponse {
        $requestStart = $request->query->get('start');
        $requestEnd = $request->query->get('end');
        if ($requestStart != null && $requestEnd != null) {
            $start = new \DateTime($requestStart);
            $end = new \DateTime($requestEnd);

            $cacheKey = "events.get_all.{$start->format('Y-m-d H:m')}.{$end->format('Y-m-d H:m')}";

            $events = $cache->get($cacheKey, function (ItemInterface $item) use ($repository, $start, $end) {
                $item->expiresAfter(3600);

                $item->tag(['events_get_all']);

                return $repository->findActiveBetweenDates($start, $end);
            });
        } else {
            $cacheKey = "events.get_all";

            $events = $cache->get($cacheKey, function (ItemInterface $item) use ($repository) {
                $item->expiresAfter(3600);

                $item->tag(['events_get_all']);

                return $repository->findAllActive();
            });
        }


        $context = SerializationContext::create()->setGroups(["getEvents"]);
        $jsonEvents = $serializer->serialize($events, 'json', $context);

        //Client-side cache
        $etag = md5($jsonEvents);

        if ($request->headers->get('If-None-Match') === $etag) {
            return new JsonResponse(null, Response::HTTP_NOT_MODIFIED);
        }

        return new JsonResponse($jsonEvents, Response::HTTP_OK, ['ETag' => $etag], true);
    }

    #[Route('/events', name: 'events.create', methods: ['POST'])]
    public function createEvents(
        Request $request,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        EventsRepository $EventsRepository,
        UserRepository $UserRepository,
        TagAwareCacheInterface $cache
    ): JsonResponse {
        /** @var events $events */
        $events = $serializer->deserialize(
            $request->getContent(),
            events::class,
            'json'
        );

        $events->setStatus('active');

        $errors = $validator->validate($events);

        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $messages], Response::HTTP_BAD_REQUEST);
        }

        //Check if one or multiple events already exist for the new event period
        $doesOverlap = $EventsRepository->doesEventsOverlap($events->getStart(), $events->getEnd());
        if ($doesOverlap) {
            return new JsonResponse(['errors' => 'events overlaps with another events'], Response::HTTP_CONFLICT);
        }

        $content = $request->toArray();

        //Check that the user id provided exists
        $user = $UserRepository->findActive($content['user_id'] ?? 0);
        if (!$user) {
            return new JsonResponse(['errors' => 'User not found or is inactive'], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($events);
        $entityManager->flush();

        $cache->invalidateTags(['events_get_all']);
        $cache->delete("user.get/{$events->getUser()->getId()}");

        $context = SerializationContext::create()->setGroups(["getEvents"]);
        $jsonEvents = $serializer->serialize($events, 'json', $context);
        return new JsonResponse($jsonEvents, Response::HTTP_CREATED, [], true);
    }

    #[Route('/events/{id}', name: 'events.update', methods: ['PATCH'])]
    public function updateEvents(
        int $id,
        Request $request,
        EventsRepository $repository,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        EventsRepository $EventsRepository,
        UserRepository $UserRepository,
        TagAwareCacheInterface $cache
    ): JsonResponse {
        $events = $repository->findActive($id);
        if (!$events) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        /** @var events $requestEvents */
        $requestEvents = $serializer->deserialize(
            $request->getContent(),
            events::class,
            'json'
        );

        $events->setStart($requestEvents->getStart() ?? $events->getStart())
            ->setEnd($requestEvents->getEnd() ?? $events->getEnd())
            ->setStatus('active');

        $errors = $validator->validate($events);

        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $messages], Response::HTTP_BAD_REQUEST);
        }

        //Check if one or multiple events already exist for the new event period
        $doesOverlap = $EventsRepository->doesEventsOverlap($events->getStart(), $events->getEnd(), $events->getId());
        if ($doesOverlap) {
            return new JsonResponse(['errors' => 'events overlaps with another events'], Response::HTTP_CONFLICT);
        }

        $content = $request->toArray();

        $user = $events->getUser();

        if (isset($content['user_id'])) {
            //Check that the user id provided exists
            $user = $UserRepository->findActive($content['user_id'] ?? 0);
            if (!$user) {
                return new JsonResponse(['errors' => 'User not found or is disabled'], Response::HTTP_BAD_REQUEST);
            }
        }

        $entityManager->persist($events);
        $entityManager->flush();

        $cache->invalidateTags(['events_get_all']);
        $cache->delete("events.get/{$id}");
        $cache->delete("user.get/{$events->getUser()->getId()}");

        $context = SerializationContext::create()->setGroups(["getEvents"]);
        $jsonEvents = $serializer->serialize($events, 'json', $context);
        return new JsonResponse($jsonEvents, Response::HTTP_OK, [], true);
    }

    #[Route('/events/{id}', name: 'events.delete', methods: ['DELETE'])]
    public function deleteEvents(
        int $id,
        EventsRepository $repository,
        EntityManagerInterface $entityManager,
        TagAwareCacheInterface $cache
    ): JsonResponse {
        $events = $repository->findActive($id);

        if (!$events) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $events->setStatus('disabled');
        $entityManager->flush();

        $cache->invalidateTags(['events_get_all']);
        $cache->delete("events.get/{$id}");
        $cache->delete("user.get/{$events->getUser()->getId()}");

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
