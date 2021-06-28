'use strict';

const GLOBAL_TIMEOUT = 40e3;

exports.config = {
    specs: [
        '../specs/**/testData1.spec.js',
        '../specs/**/testData2.spec.js'
    ],
    capabilities: {
        browserName: 'chrome',
        'shardTestFiles': true,
        'maxInstances': 2
    },
    directConnect: true,
    mochaOpts: {
        reporter: 'spec'
    },
    framework: 'mocha',
    getPageTimeout: GLOBAL_TIMEOUT,
    onPrepare: async function () {
        global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;

        await browser.waitForAngularEnabled(false);
        try {
            await browser.manage().window().maximize();
        } catch (e) {
            await browser.manage().window().setSize(1800, 1012);
        }
    }
};