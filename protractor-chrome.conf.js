"use strict";
var path = require("path");
var useref = require("useref");
var cheerio = require("cheerio");
var fs = require("fs");
var crew = require("serenity-js/lib/stage_crew");
var SetDesigner_1 = require("./screenPlay/SetDesigner");
exports.config = {
    seleniumServerJar: '../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
    baseUrl: 'http://localhost:63342/src/frontend/',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-web-security', '--user-data-dir', '--disk-cache-size=1'],
            prefs: {
                intl: { accept_languages: 'de' }
            }
        }
    },
    SELENIUM_PROMISE_MANAGER: false,
    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),
    serenity: {
        dialect: 'cucumber',
        crew: [
            crew.photographer(),
            crew.serenityBDDReporter(),
            SetDesigner_1.setDesigner()
        ]
    },
    specs: [
        'features/**/*.feature'
    ],
    // Options to be passed to Cucumber.
    cucumberOpts: {
        compiler: [],
        require: [
            path.join(__dirname, 'support', 'World.js'),
            path.join(__dirname, 'support', 'Hooks.js'),
            path.join(__dirname, 'stepDefinitions', '**', '*.steps.js') // require step definions before executing features
        ],
        tags: '~@Ignored',
        format: ['pretty'] // <string[]> specify the output format (see https://cucumber.io/docs/reference#reports for details)
    },
    beforeLaunch: function () {
        var indexHtmlWithMock = useref(fs.readFileSync('./index.html', 'utf-8'), {
            mocking: function (content, target, options, altSearchPath) {
                return '<!-- build:mocking -->\n' +
                    '    <script id="sinon" src="lib/sinon/index.js"></script>\n' +
                    '    <script id="mockbackend">\n' +
                    '        window.mockBackend = sinon.fakeServer.create();\n' +
                    '        window.mockBackend.autoRespond = true;\n' +
                    '        window.mockBackend.xhr.useFilters = true;\n' +
                    '        window.mockBackend.xhr.addFilter(function (method, url, async, username, password) {\n' +
                    '            return !url.match(/dev.iteratec.de:9081\\/web\\/api\\/.*/);\n' +
                    '        });\n' +
                    '        window.mockBackend.respondWith(/\\/web\\/api\\/masterData\\/files/, [\n' +
                    '            200,\n' +
                    '            { "Content-Language": "de-DE", "Content-Type": "application/json", "Content-Length": 2 },\n' +
                    '            "[]"\n' +
                    '        ]);\n' +
                    '    </script>\n' +
                    '    <!-- endbuild -->';
            }
        });
        fs.writeFileSync('./index.html', indexHtmlWithMock[0]);
    },
    afterLaunch: function (exitCode) {
        var $ = cheerio.load(fs.readFileSync('./index.html', 'utf-8'));
        $('#mockbackend').remove();
        $('#sinon').remove();
        fs.writeFileSync('./index.html', $.html(), { encoding: 'utf8' });
    }
};
//# sourceMappingURL=protractor-chrome.conf.js.map