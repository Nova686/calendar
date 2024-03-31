<?php

namespace ContainerKiUrfRB;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getHateoas_Generator_RegistryService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'hateoas.generator.registry' shared service.
     *
     * @return \Hateoas\UrlGenerator\UrlGeneratorRegistry
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/willdurand/hateoas/src/UrlGenerator/UrlGeneratorRegistry.php';
        include_once \dirname(__DIR__, 4).'/vendor/willdurand/hateoas/src/UrlGenerator/UrlGeneratorInterface.php';
        include_once \dirname(__DIR__, 4).'/vendor/willdurand/hateoas/src/UrlGenerator/SymfonyUrlGenerator.php';

        return $container->services['hateoas.generator.registry'] = new \Hateoas\UrlGenerator\UrlGeneratorRegistry(new \Hateoas\UrlGenerator\SymfonyUrlGenerator(($container->services['router'] ?? self::getRouterService($container))));
    }
}
