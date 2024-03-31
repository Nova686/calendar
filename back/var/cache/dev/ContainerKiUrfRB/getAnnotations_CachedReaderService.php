<?php

namespace ContainerKiUrfRB;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getAnnotations_CachedReaderService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'annotations.cached_reader' shared service.
     *
     * @return \Doctrine\Common\Annotations\PsrCachedReader
     *
     * @deprecated Since symfony/framework-bundle 6.4: The "annotations.cached_reader" service is deprecated without replacement.
     */
    public static function do($container, $lazyLoad = true)
    {
        trigger_deprecation('symfony/framework-bundle', '6.4', 'The "annotations.cached_reader" service is deprecated without replacement.');

        return $container->privates['annotations.cached_reader'] = new \Doctrine\Common\Annotations\PsrCachedReader(($container->privates['annotations.reader'] ?? $container->load('getAnnotations_ReaderService')), $container->load('getAnnotations_CacheAdapterService'), true);
    }
}
