<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use JMS\Serializer\SerializationContext;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\TagAwareCacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class UserController extends AbstractController
{
    #[Route('/user/current', name: 'user.get_current', methods: ['GET'])]
    public function getCurrentUserInfos(SerializerInterface $serializer): JsonResponse
    {
        $currentUser = $this->getUser();

        $context = SerializationContext::create()->setGroups(["getUserInfos"])->setSerializeNull(true);

        $jsonCurrentUser = $serializer->serialize($currentUser, 'json', $context);

        return new JsonResponse($jsonCurrentUser, Response::HTTP_OK, [], true);
    }

    #[Route('/user/{id}', name: 'user.get', methods: ['GET'])]
    public function getUserById(
        int $id,
        UserRepository $userRepository,
        SerializerInterface $serializer,
        CacheInterface $cache,
        Request $request
    ): JsonResponse {
        $cacheKey = "user.get/{$id}";

        $user = $cache->get($cacheKey, function (ItemInterface $item) use ($userRepository, $id) {
            $item->expiresAfter(3600);

            return $userRepository->findActiveWithEvents($id);
        });

        $currentUser = $this->getUser();

        if ($user->getUsername() == $currentUser->getUserIdentifier()) {
            $context = SerializationContext::create()->setGroups(["getUser"])->setSerializeNull(true);

            $jsonCurrentUser = $serializer->serialize($user, 'json', $context);

            //Client-side cache
            $etag = md5($jsonCurrentUser);

            if ($request->headers->get('If-None-Match') === $etag) {
                return new JsonResponse(null, Response::HTTP_NOT_MODIFIED);
            }

            return new JsonResponse($jsonCurrentUser, Response::HTTP_OK, ['ETag' => $etag], true);
        } else {
            return new JsonResponse(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    #[Route('/api/register', name: 'user.register', methods: ['POST'])]
    public function registerUser(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        SerializerInterface $serializer,
        JWTTokenManagerInterface $tokenManager,
        ValidatorInterface $validator,
    ): JsonResponse {
        /**
         * @var User $user
         */
        $user = $serializer->deserialize(
            $request->getContent(),
            User::class,
            'json'
        );
        $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);
        $user->setStatus('active');

        $errors = $validator->validate($user);
        if ($errors->count() > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }

        $entityManager->persist($user);
        $entityManager->flush();
    }

    #[Route('/api/user/{id}', name: 'user.delete', methods: ['DELETE'])]
    public function deleteUser(
        int $id,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        TagAwareCacheInterface $cache
    ): JsonResponse {
        $user = $userRepository->findActive($id);

        if (!$user) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $userEvents = $user->getEvents();

        foreach ($userEvents as $event) {
            $event->setStatus('disabled');
        }

        $currentUser = $this->getUser();

        if ($user->getUsername() == $currentUser->getUserIdentifier()) {
            $user->setStatus('disabled');
            $entityManager->flush();

            $cache->delete("user.get/{$id}");

            // Disable all user's event
            if (count($userEvents) > 0) {
                $cache->invalidateTags(['event_get_all']);

                foreach ($userEvents as $event) {
                    $cache->delete("event.get/{$event->getId()}");
                }
            }
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } else {
            return new JsonResponse(null, Response::HTTP_UNAUTHORIZED);
        }
    }
}
