<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerRf7WuOw\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerRf7WuOw/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerRf7WuOw.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerRf7WuOw\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerRf7WuOw\App_KernelDevDebugContainer([
    'container.build_hash' => 'Rf7WuOw',
    'container.build_id' => '3cb36d8b',
    'container.build_time' => 1711993428,
    'container.runtime_mode' => \in_array(\PHP_SAPI, ['cli', 'phpdbg', 'embed'], true) ? 'web=0' : 'web=1',
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerRf7WuOw');
