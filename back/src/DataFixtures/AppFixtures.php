<?php

namespace App\DataFixtures;

use App\Entity\Events;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Generator;
use Faker\Factory;
use App\Entity\User;
use DateTime;
use DateInterval;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    /**
     * Faker Generator
     *
     * @var Generator
     */
    private Generator $faker;

    /**
     * Class that hashs the password
     *
     * @var UserPasswordHasherInterface
     */
    private UserPasswordHasherInterface $passHasher;

    public function __construct(UserPasswordHasherInterface $passHasher)
    {
        $this->faker = Factory::create('en_GB');
        $this->passHasher = $passHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setUsername("user")
            ->setPassword($this->passHasher->hashPassword($user, "user"))
            ->setStatus(true);
        $manager->persist($user);

        for ($i = 1; $i <= 50; $i++) {

            if ($i % 5 === 0) {
                $event = $this->GenerateEvent($user);
                if ($event != null) {
                    $manager->persist($event);
                }
            }
        }

        $manager->flush();
    }

    private function GenerateEvent(User $user): ?Events
    {
        $event = new Events();

        // I want to get a random starting point for my event in my slot, and be sure it can't end after slot's end
        // $diffBetweenDates = (int) (($slot->getEndDate()->getTimestamp() - $slot->getStartDate()->getTimestamp()) / 60);
        // $serviceTypeDuration = $randomServiceType->getDuration()->i;

        // $availableRange = $diffBetweenDates - $serviceTypeDuration;

        // if ($availableRange < 0) {
        //     return null;
        // }

        // $randomStartMinutes = rand(0, $availableRange);
        // $randomStartDate = DateTime::createFromInterface($slot->getStartDate());
        // $randomStartDate->add(new DateInterval("PT{$randomStartMinutes}M"));

        // $randomHourMinutes = rand(0, 3) * 15;
        // $randomStartDate->setTime((int)$randomStartDate->format('H'), $randomHourMinutes, 0);
        // $randomEndDate = clone $randomStartDate;
        // $randomEndDate->add(new DateInterval("PT{$serviceTypeDuration}M"));

        // $event->setStart($randomStartDate)
        //     ->setEnd($randomEndDate)
        //     ->setUser($user)
        //     ->setStatus('active');

        return $event;
    }
}
