<?php

namespace ContainerESJmAZx;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getGesdinet_Jwtrefreshtoken_Request_Extractor_ChainService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'gesdinet.jwtrefreshtoken.request.extractor.chain' shared service.
     *
     * @return \Gesdinet\JWTRefreshTokenBundle\Request\Extractor\ChainExtractor
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/gesdinet/jwt-refresh-token-bundle/Request/Extractor/ExtractorInterface.php';
        include_once \dirname(__DIR__, 4).'/vendor/gesdinet/jwt-refresh-token-bundle/Request/Extractor/ChainExtractor.php';
        include_once \dirname(__DIR__, 4).'/vendor/gesdinet/jwt-refresh-token-bundle/Request/Extractor/RequestBodyExtractor.php';
        include_once \dirname(__DIR__, 4).'/vendor/gesdinet/jwt-refresh-token-bundle/Request/Extractor/RequestParameterExtractor.php';
        include_once \dirname(__DIR__, 4).'/vendor/gesdinet/jwt-refresh-token-bundle/Request/Extractor/RequestCookieExtractor.php';

        $container->services['gesdinet.jwtrefreshtoken.request.extractor.chain'] = $instance = new \Gesdinet\JWTRefreshTokenBundle\Request\Extractor\ChainExtractor();

        $instance->addExtractor(new \Gesdinet\JWTRefreshTokenBundle\Request\Extractor\RequestBodyExtractor());
        $instance->addExtractor(new \Gesdinet\JWTRefreshTokenBundle\Request\Extractor\RequestParameterExtractor());
        $instance->addExtractor(new \Gesdinet\JWTRefreshTokenBundle\Request\Extractor\RequestCookieExtractor());

        return $instance;
    }
}
