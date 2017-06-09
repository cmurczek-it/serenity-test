"use strict";
exports.config = {
    framework: 'jasmine2',
    seleniumServerJar: './../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
    baseUrl: './',
    specs: [
        'StartupTest.js'
    ],
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    },
    capabilities: {
        'browserName': 'phantomjs',
        /*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         */
        'phantomjs.binary.path': require('phantomjs').path,
        /*
         * Command line args to pass to ghostdriver, phantomjs's browser driver.
         * See https://github.com/detro/ghostdriver#faq
         */
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
        /*
         * Set the language. Howevere doesn't seem to work :(
         */
        'phantomjs.page.customHeaders.Accept-Language': 'de-DE'
    },
    onPrepare: function () {
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './target',
            filePrefix: 'uitest-results'
        }));
    },
    plugins: [{
            package: 'protractor-console',
            logLevels: ['debug', 'info', 'warning', 'severe']
        }],
};
//# sourceMappingURL=protractor.conf.js.map