<?php

namespace ContainerKiUrfRB;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getHateoas_LinkFactoryService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'hateoas.link_factory' shared service.
     *
     * @return \Hateoas\Factory\LinkFactory
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/willdurand/hateoas/src/Factory/LinkFactory.php';

        return $container->privates['hateoas.link_factory'] = new \Hateoas\Factory\LinkFactory(($container->services['hateoas.generator.registry'] ?? $container->load('getHateoas_Generator_RegistryService')), ($container->privates['jms_serializer.expression_evaluator'] ?? $container->load('getJmsSerializer_ExpressionEvaluatorService')));
    }
}
