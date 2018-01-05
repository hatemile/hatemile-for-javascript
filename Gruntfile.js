module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            options: {
                bare: false
            },
            compile: {
                files: {
                    'js/eventlistener.js': 'coffee/eventlistener.coffee',
                    'js/hatemile-symbols.js': 'coffee/hatemile-symbols.coffee',
                    'js/hatemile-skippers.js': 'coffee/hatemile-skippers.coffee',
                    'js/hatemile/AccessibleAssociation.js': 'coffee/hatemile/AccessibleAssociation.coffee',
                    'js/hatemile/AccessibleCSS.js': 'coffee/hatemile/AccessibleCSS.coffee',
                    'js/hatemile/AccessibleDisplay.js': 'coffee/hatemile/AccessibleDisplay.coffee',
                    'js/hatemile/AccessibleEvent.js': 'coffee/hatemile/AccessibleEvent.coffee',
                    'js/hatemile/AccessibleForm.js': 'coffee/hatemile/AccessibleForm.coffee',
                    'js/hatemile/AccessibleNavigation.js': 'coffee/hatemile/AccessibleNavigation.coffee',
                    'js/hatemile/implementation/AccessibleAssociationImplementation.js': 'coffee/hatemile/implementation/AccessibleAssociationImplementation.coffee',
                    'js/hatemile/implementation/AccessibleCSSImplementation.js': 'coffee/hatemile/implementation/AccessibleCSSImplementation.coffee',
                    'js/hatemile/implementation/AccessibleDisplayScreenReaderImplementation.js': 'coffee/hatemile/implementation/AccessibleDisplayScreenReaderImplementation.coffee',
                    'js/hatemile/implementation/AccessibleEventImplementation.js': 'coffee/hatemile/implementation/AccessibleEventImplementation.coffee',
                    'js/hatemile/implementation/AccessibleFormImplementation.js': 'coffee/hatemile/implementation/AccessibleFormImplementation.coffee',
                    'js/hatemile/implementation/AccessibleNavigationImplementation.js': 'coffee/hatemile/implementation/AccessibleNavigationImplementation.coffee',
                    'js/hatemile/util/CommonFunctions.js': 'coffee/hatemile/util/CommonFunctions.coffee',
                    'js/hatemile/util/Configure.js': 'coffee/hatemile/util/Configure.coffee',
                    'js/hatemile/util/IDGenerator.js': 'coffee/hatemile/util/IDGenerator.coffee',
                    'js/hatemile/util/css/StyleSheetDeclaration.js': 'coffee/hatemile/util/css/StyleSheetDeclaration.coffee',
                    'js/hatemile/util/css/StyleSheetParser.js': 'coffee/hatemile/util/css/StyleSheetParser.coffee',
                    'js/hatemile/util/css/StyleSheetRule.js': 'coffee/hatemile/util/css/StyleSheetRule.coffee',
                    'js/hatemile/util/css/jscssp/JSCSSPDeclaration.js': 'coffee/hatemile/util/css/jscssp/JSCSSPDeclaration.coffee',
                    'js/hatemile/util/css/jscssp/JSCSSPParser.js': 'coffee/hatemile/util/css/jscssp/JSCSSPParser.coffee',
                    'js/hatemile/util/css/jscssp/JSCSSPRule.js': 'coffee/hatemile/util/css/jscssp/JSCSSPRule.coffee',
                    'js/hatemile/util/html/HTMLDOMElement.js': 'coffee/hatemile/util/html/HTMLDOMElement.coffee',
                    'js/hatemile/util/html/HTMLDOMNode.js': 'coffee/hatemile/util/html/HTMLDOMNode.coffee',
                    'js/hatemile/util/html/HTMLDOMParser.js': 'coffee/hatemile/util/html/HTMLDOMParser.coffee',
                    'js/hatemile/util/html/HTMLDOMTextNode.js': 'coffee/hatemile/util/html/HTMLDOMTextNode.coffee',
                    'js/hatemile/util/html/jquery/JQueryHTMLDOMParser.js': 'coffee/hatemile/util/html/jquery/JQueryHTMLDOMParser.coffee',
                    'js/hatemile/util/html/vanilla/VanillaHTMLDOMElement.js': 'coffee/hatemile/util/html/vanilla/VanillaHTMLDOMElement.coffee',
                    'js/hatemile/util/html/vanilla/VanillaHTMLDOMParser.js': 'coffee/hatemile/util/html/vanilla/VanillaHTMLDOMParser.coffee',
                    'js/hatemile/util/html/vanilla/VanillaHTMLDOMTextNode.js': 'coffee/hatemile/util/html/vanilla/VanillaHTMLDOMTextNode.coffee',
                    '_locales/en_US/js/configurations.js': '_locales/en_US/coffee/configurations.coffee',
                    '_locales/pt_BR/js/configurations.js': '_locales/pt_BR/coffee/configurations.coffee'
                }
            }
        },
        js_beautify: {
            options: {
                end_with_newline: true,
                jslint_happy: true
            },
            files: ['js/**/*.js', '_locales/**/*.js']
        },
        codo: {
            src: ['coffee/hatemile']
        },
        coffeelint: {
            src: ['coffee/**/*.coffee', '_locales/**/*.coffee'],
            options: {
                'arrow_spacing': {
                    'level': 'error'
                },
                'braces_spacing': {
                    'level': 'error'
                },
                'line_endings': {
                    'level': 'error'
                },
                'no_unnecessary_double_quotes': {
                    'level': 'error'
                },
                'no_implicit_parens': {
                    'level': 'error'
                },
                'no_interpolation_in_single_quotes': {
                    'level': 'error'
                },
                'no_nested_string_interpolation': {
                    'level': 'error'
                },
                'no_plusplus': {
                    'level': 'error'
                },
                'prefer_english_operator': {
                    'level': 'error'
                },
                'space_operators': {
                    'level': 'error'
                },
                'spacing_after_comma': {
                    'level': 'error'
                },
                'max_line_length': {
                    'limitComments': false
                }
            }
        }
    });

    // Load dependencies.
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-js-beautify');
    grunt.loadNpmTasks('grunt-codo');

    // Default task(s).
    grunt.registerTask('default', ['coffeelint', 'coffee', 'js_beautify']);
    grunt.registerTask('doc', ['codo']);
    grunt.registerTask('test', ['coffeelint']);
};
