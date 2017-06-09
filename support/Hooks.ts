'use strict';

import { use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as fs from "fs";
import { browser } from 'protractor';
import * as cheerio from 'cheerio';


export = function hooks() {

    this.Before(function (scenario) {
        use(chaiAsPromised);
        use(require('chai-smoothie'));
    });

    this.After(function(scenario) {
        const $ = cheerio.load(fs.readFileSync('./index.html', 'utf-8'));
        $('#user').remove();
        $('#cast').remove();
        fs.writeFileSync('./index.html', $.html());
    });

    this.registerHandler('AfterFeatures', function (features, callback) {
        browser.executeScript('window.mockBackend.restore();').then(() => {
            browser.quit().then(() => {
                callback();
            });
        });
    });
};