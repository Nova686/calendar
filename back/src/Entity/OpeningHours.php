<?php

namespace App\Entity;

use App\Repository\OpeningHoursRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OpeningHoursRepository::class)]
class OpeningHours
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $hourOpening = null;

    #[ORM\Column]
    private ?int $hourClosing = null;

    #[ORM\Column(length: 255)]
    private ?string $day = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHourOpening(): ?int
    {
        return $this->hourOpening;
    }

    public function setHourOpening(int $hourOpening): static
    {
        $this->hourOpening = $hourOpening;

        return $this;
    }

    public function getHourClosing(): ?int
    {
        return $this->hourClosing;
    }

    public function setHourClosing(int $hourClosing): static
    {
        $this->hourClosing = $hourClosing;

        return $this;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): static
    {
        $this->day = $day;

        return $this;
    }
}
