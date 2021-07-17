'use strict';

const GLOBAL_TIMEOUT = 40e3;
const mongoose = require('mongoose');
const Job = require('../test-data-files/model/job');

exports.config = {
    specs: '../specs/test.spec.js',
    capabilities: {
        browserName: 'chrome',
    },
    directConnect: true,
    mochaOpts: {
        reporter: 'spec'
    },
    framework: 'mocha',
    getPageTimeout: GLOBAL_TIMEOUT,
    onPrepare: async function () {
        const dbURI = 'mongodb+srv://admin:test1234@cluster0.uvjtw.mongodb.net/uiDatabase?retryWrites=true&w=majority';
        await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
        const testData1ID = "60ec433091ce0d3f289a6687";
        const testData2ID = "60ec433091ce0d3f289a6688";
        const result = await Job.findById(testData1ID);
        global.input = result;
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