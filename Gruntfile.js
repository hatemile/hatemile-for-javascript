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
                    'js/common.js': 'coffee/common.coffee',
                    'js/eventlistener.js': 'coffee/eventlistener.coffee',
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
                    '_locales/en_US/js/skippers.js': '_locales/en_US/coffee/skippers.coffee',
                    '_locales/en_US/js/symbols.js': '_locales/en_US/coffee/symbols.coffee',
                    '_locales/pt_BR/js/configurations.js': '_locales/pt_BR/coffee/configurations.coffee',
                    '_locales/pt_BR/js/skippers.js': '_locales/pt_BR/coffee/skippers.coffee',
                    '_locales/pt_BR/js/symbols.js': '_locales/pt_BR/coffee/symbols.coffee'
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
        }
    });

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-js-beautify');
    grunt.loadNpmTasks('grunt-codo');

    // Default task(s).
    grunt.registerTask('default', ['coffee', 'js_beautify']);
    grunt.registerTask('doc', ['codo']);
};