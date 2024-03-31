<?php

namespace Container20xAak4;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getHateoas_Helper_LinkService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'hateoas.helper.link' shared service.
     *
     * @return \Hateoas\Helper\LinkHelper
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/willdurand/hateoas/src/Helper/LinkHelper.php';

        return $container->services['hateoas.helper.link'] = new \Hateoas\Helper\LinkHelper(($container->privates['hateoas.link_factory'] ?? $container->load('getHateoas_LinkFactoryService')), ($container->privates['hateoas.configuration.metadata_factory'] ?? $container->load('getHateoas_Configuration_MetadataFactoryService')));
    }
}
