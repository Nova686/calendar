<?php

namespace App\Repository;

use App\Entity\Events;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class EventsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Events::class);
    }

    public function findActive($id): ?Events
    {
        $qb = $this->createQueryBuilder('e')
            ->where('e.id = :id')
            ->andWhere('e.status = :status')
            ->setParameter('id', $id)
            ->setParameter('status', 'active');

        $query = $qb->getQuery();

        return $query->getOneOrNullResult();
    }

    public function findAllActive(): array
    {
        $qb = $this->createQueryBuilder('e')
            ->where('e.status = :status')
            ->setParameter('status', 'active');

        $query = $qb->getQuery();

        return $query->getResult();
    }

    public function doesEventsOverlap(\DateTimeInterface $start, \DateTimeInterface $end, int $eventsId = null): bool
    {
        $qb = $this->createQueryBuilder('e')
            ->where('e.start between :start and :end')
            ->orWhere('e.end between :start and :end')
            ->orWhere(':start between e.start and e.end')
            ->andWhere('e.status = :status')
            ->setParameter('end', $end)
            ->setParameter('start', $start)
            ->setParameter('status', 'active');

        if ($eventsId !== null) {
            $qb->andWhere('e.id != :eventsId')
                ->setParameter('eventsId', $eventsId);
        }

        $query = $qb->getQuery();
        $result = $query->getResult();

        return count($result) > 0;
    }

    public function findEventsInNext24Hours(): array
    {
        $now = new \DateTime();

        $startTime = (clone $now)->modify('+24 hours');

        $endTime = (clone $now)->modify('+24 hours 15 minutes');

        $qb = $this->createQueryBuilder('e');

        $qb->where('e.start >= :startTime')
            ->andWhere('e.end <= :endTime')
            ->setParameter('startTime', $startTime)
            ->setParameter('endTime', $endTime);

        return $qb->getQuery()->getResult();
    }

    public function findActiveBetweenDates(\DateTimeInterface $start, \DateTimeInterface $end): array
    {
        $qb = $this->createQueryBuilder('e')
            ->where('e.status = :status')
            ->andWhere('e.start >= :start')
            ->andWhere('e.end <= :end')
            ->orderBy('e.start', 'ASC')
            ->setParameter('status', 'active')
            ->setParameter('startDate', $start)
            ->setParameter('endDate', $end);

        return $qb->getQuery()->getResult();
    }
}
