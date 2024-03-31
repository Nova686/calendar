<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* @NelmioApiDoc/Redocly/index.html.twig */
class __TwigTemplate_64a6c9841b8851b4749083135a3fd14b extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'meta' => [$this, 'block_meta'],
            'title' => [$this, 'block_title'],
            'stylesheets' => [$this, 'block_stylesheets'],
            'swagger_data' => [$this, 'block_swagger_data'],
            'swagger_ui' => [$this, 'block_swagger_ui'],
            'javascripts' => [$this, 'block_javascripts'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@NelmioApiDoc/Redocly/index.html.twig"));

        // line 1
        echo "<!DOCTYPE html>
<html>
<head>
    ";
        // line 4
        $this->displayBlock('meta', $context, $blocks);
        // line 8
        echo "    <title>";
        $this->displayBlock('title', $context, $blocks);
        echo "</title>

    ";
        // line 10
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 22
        echo "
    ";
        // line 23
        $this->displayBlock('swagger_data', $context, $blocks);
        // line 27
        echo "</head>
<body>
    ";
        // line 29
        $this->displayBlock('swagger_ui', $context, $blocks);
        // line 32
        echo "
    ";
        // line 33
        $this->displayBlock('javascripts', $context, $blocks);
        // line 36
        echo "
    ";
        // line 37
        echo $this->extensions['Nelmio\ApiDocBundle\Render\Html\GetNelmioAsset']->__invoke((isset($context["assets_mode"]) || array_key_exists("assets_mode", $context) ? $context["assets_mode"] : (function () { throw new RuntimeError('Variable "assets_mode" does not exist.', 37, $this->source); })()), "init-redocly-ui.js");
        echo "
</html>";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 4
    public function block_meta($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "meta"));

        // line 5
        echo "        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 8
    public function block_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["swagger_data"]) || array_key_exists("swagger_data", $context) ? $context["swagger_data"] : (function () { throw new RuntimeError('Variable "swagger_data" does not exist.', 8, $this->source); })()), "spec", [], "any", false, false, false, 8), "info", [], "any", false, false, false, 8), "title", [], "any", false, false, false, 8), "html", null, true);
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 10
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 11
        echo "        <link
                href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700\"
                rel=\"stylesheet\"
        />
        <style>
            body {
                margin: 0;
                padding: 0;
            }
        </style>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 23
    public function block_swagger_data($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "swagger_data"));

        // line 24
        echo "        ";
        // line 25
        echo "        <script id=\"swagger-data\" type=\"application/json\">";
        echo json_encode((isset($context["swagger_data"]) || array_key_exists("swagger_data", $context) ? $context["swagger_data"] : (function () { throw new RuntimeError('Variable "swagger_data" does not exist.', 25, $this->source); })()), 65);
        echo "</script>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 29
    public function block_swagger_ui($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "swagger_ui"));

        // line 30
        echo "        <div id=\"swagger-ui\"></div>
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 33
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 34
        echo "        ";
        echo $this->extensions['Nelmio\ApiDocBundle\Render\Html\GetNelmioAsset']->__invoke((isset($context["assets_mode"]) || array_key_exists("assets_mode", $context) ? $context["assets_mode"] : (function () { throw new RuntimeError('Variable "assets_mode" does not exist.', 34, $this->source); })()), "redocly/redoc.standalone.js");
        echo "
    ";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@NelmioApiDoc/Redocly/index.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  183 => 34,  176 => 33,  168 => 30,  161 => 29,  151 => 25,  149 => 24,  142 => 23,  125 => 11,  118 => 10,  105 => 8,  96 => 5,  89 => 4,  80 => 37,  77 => 36,  75 => 33,  72 => 32,  70 => 29,  66 => 27,  64 => 23,  61 => 22,  59 => 10,  53 => 8,  51 => 4,  46 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    {% block meta %}
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>
    {% endblock meta %}
    <title>{% block title %}{{ swagger_data.spec.info.title }}{% endblock title %}</title>

    {% block stylesheets %}
        <link
                href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700\"
                rel=\"stylesheet\"
        />
        <style>
            body {
                margin: 0;
                padding: 0;
            }
        </style>
    {% endblock stylesheets %}

    {% block swagger_data %}
        {# json_encode(65) is for JSON_UNESCAPED_SLASHES|JSON_HEX_TAG to avoid JS XSS #}
        <script id=\"swagger-data\" type=\"application/json\">{{ swagger_data|json_encode(65)|raw }}</script>
    {% endblock swagger_data %}
</head>
<body>
    {% block swagger_ui %}
        <div id=\"swagger-ui\"></div>
    {% endblock %}

    {% block javascripts %}
        {{ nelmioAsset(assets_mode, 'redocly/redoc.standalone.js') }}
    {% endblock javascripts %}

    {{ nelmioAsset(assets_mode, 'init-redocly-ui.js') }}
</html>", "@NelmioApiDoc/Redocly/index.html.twig", "/home/no-pop-os/Bureau/fullstacks/back/vendor/nelmio/api-doc-bundle/templates/Redocly/index.html.twig");
    }
}
