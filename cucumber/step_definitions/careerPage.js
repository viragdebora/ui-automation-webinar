'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const CareerPage = require('../pages/careerPage');
const JobResultsPage = require('../pages/jobResultsPage');
const JobPage = require('../pages/jobPage');
const careerPage = new CareerPage();
const jobResultsPage = new JobResultsPage();
const jobPage = new JobPage();
setDefaultTimeout(GLOBAL_TIMEOUT);

  //Givens
  Given(/the career page is opened/, function () {
    return careerPage.load();
  });

  //Whens
  When(/(.*) and (.*) selected in the location filter box/, async function (country, city) {
    return await careerPage.selectLocation(country, city);
  });

  When(/(.*) selected in the department filter box/, function (department) {
    return careerPage.selectDepartment(department);
  });

  When(/the search button is clicked/, function () {
    return careerPage.submitSearch();
  });

  When(/the apply button for (.*) is clicked/, function (positionName) {
    return jobResultsPage.applyToPosition(positionName);
  });

  //Thens
  Then(/the cookie bar should be closed/, function () {
    return careerPage.cookieClose();
  });

  Then(/the (.*) should be visible/, function (selector) {
    const selectedElement = (selector === "logo") ? careerPage.logo : careerPage.searchForm;
    return expect(selectedElement.isPresent()).to.eventually.be.true;
  });

  Then(/the (.*) location should be selected/,async function (city) {
    return expect(await careerPage.getSelectedCity()).to.equal(city);
  });

  Then(/the (.*) department should be selected/, async function (department) {
    return expect(await careerPage.getSelectedDepartment(department)).to.equal(department.toUpperCase());
  });

  Then(/should be scroll to the (.*)/, function(positionName) {
    return jobResultsPage.scrollToResult(positionName);
  });

  Then(/should have a proper job found for (.*) position/,async function (positionName) {
    return expect(await jobResultsPage.getPositionName(positionName)).to.equal(positionName);
  });

  Then(/the proper location in the (\d+)th result should be (.*)/, async function (hit, city) {
    return expect(await jobResultsPage.getLocationOfJob(hit).includes(city.toUpperCase())).to.be.true;
  });

  Then(/in the (\d+)th result description should be visible/, function (hit) {
    return expect(jobResultsPage.jobDescription(hit).isPresent()).to.eventually.be.true;
  });

  Then(/apply button should be visible for (.*) position/, function (positionName) {
    return expect(jobResultsPage.getApplyButton(positionName).isPresent()).to.eventually.be.true;
  });

  Then(/should have (.*) position name in the job description/, async function (positionName) {
    return expect(await jobPage.getPositionName().includes(positionName)).to.be.true;
  });

  Then(/should have (.*) city in the job description/, async function (city) {
    return expect(await jobPage.getLocation().includes(city)).to.be.true;
  });