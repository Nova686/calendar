<?php

namespace ContainerRf7WuOw;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getNelmioApiDoc_RenderDocsService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'nelmio_api_doc.render_docs' shared service.
     *
     * @return \Nelmio\ApiDocBundle\Render\RenderOpenApi
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/nelmio/api-doc-bundle/src/Render/RenderOpenApi.php';
        include_once \dirname(__DIR__, 4).'/vendor/nelmio/api-doc-bundle/src/Render/OpenApiRenderer.php';
        include_once \dirname(__DIR__, 4).'/vendor/nelmio/api-doc-bundle/src/Render/Json/JsonOpenApiRenderer.php';
        include_once \dirname(__DIR__, 4).'/vendor/nelmio/api-doc-bundle/src/Render/Yaml/YamlOpenApiRenderer.php';
        include_once \dirname(__DIR__, 4).'/vendor/nelmio/api-doc-bundle/src/Render/Html/HtmlOpenApiRenderer.php';

        return $container->services['nelmio_api_doc.render_docs'] = new \Nelmio\ApiDocBundle\Render\RenderOpenApi(new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'default' => ['services', 'nelmio_api_doc.generator.default', 'getNelmioApiDoc_Generator_DefaultService', true],
        ], [
            'default' => '?',
        ]), new \Nelmio\ApiDocBundle\Render\Json\JsonOpenApiRenderer(), new \Nelmio\ApiDocBundle\Render\Yaml\YamlOpenApiRenderer(), new \Nelmio\ApiDocBundle\Render\Html\HtmlOpenApiRenderer(($container->privates['twig'] ?? $container->load('getTwigService'))));
    }
}
