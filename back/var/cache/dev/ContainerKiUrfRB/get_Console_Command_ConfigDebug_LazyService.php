<?php

namespace ContainerKiUrfRB;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_Console_Command_ConfigDebug_LazyService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.console.command.config_debug.lazy' shared service.
     *
     * @return \Symfony\Component\Console\Command\LazyCommand
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/console/Command/Command.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/console/Command/LazyCommand.php';

        return $container->privates['.console.command.config_debug.lazy'] = new \Symfony\Component\Console\Command\LazyCommand('debug:config', [], 'Dump the current configuration for an extension', false, #[\Closure(name: 'console.command.config_debug', class: 'Symfony\\Bundle\\FrameworkBundle\\Command\\ConfigDebugCommand')] fn (): \Symfony\Bundle\FrameworkBundle\Command\ConfigDebugCommand => ($container->privates['console.command.config_debug'] ?? $container->load('getConsole_Command_ConfigDebugService')));
    }
}
