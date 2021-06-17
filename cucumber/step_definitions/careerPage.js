'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const { browser, element } = require('protractor');
setDefaultTimeout(GLOBAL_TIMEOUT);

const locationFilterArrow = element(by.css(".select2-selection__arrow"));
const locationCityDebrecen = element(by.css('[id*="Debrecen"]'));
const locationCountryBelarus = element(by.xpath("//strong[contains(text(),'Belarus')]"));
const locationCityMinsk = element(by.css('[id*="Minsk"]'));
const selectedCityFieldSelector = ".select2-selection__rendered";
const departmentFilterArrow = element(by.css(".selected-params"));
const departmentFilterSTE = element(by.xpath("//span[contains(text(),'Software Test Engineering')]"));
const departmentFilterSA = element(by.xpath("//span[contains(text(),'Software Architecture')]"));
const selectedDepartmentFieldSelectorSTE = `li[data-value="Software Test Engineering"]`;
const selectedDepartmentFieldSelectorSA = `li[data-value="Software Architecture"]`;
const jobFoundSTE = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[5]"));
const jobFoundSA = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[4]"));
const jobResultSelectorSTE = "a.search-result__item-name[href*='.test-automation-engineer']";
const jobResultSelectorSA = "a.search-result__item-name[href*='.digital-solutions-architect']";
//const jobLocationSelectorSTE = "/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[5]/div[1]/strong[1]";
const jobLocationSelectorSTE = ".search-result__item:nth-of-type(5) .search-result__location";
const jobLocationSelectorSA = "/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[4]/div[1]/strong[1]";
const jobDescriptionSelectorSTE = ".search-result__item:nth-of-type(5) .search-result__item-description";
const jobDescriptionSelectorSA = ".search-result__item:nth-of-type(4) .search-result__item-description";
const applyButtonSelectorSTE = "a.search-result__item-apply[href*='.test-automation-engineer']";
const applyButtonSelectorSA = "a.search-result__item-apply[href*='.digital-solutions-architect']";
const logo = ".header__logo";
const search_form = ".recruiting-search__form";


  //Givens
  Given(/the career page is opened/, function () {
    return browser.get("https://www.epam.com/careers");
  });

  //Whens
  When(/Hungary and Debrecen selected in the location filter box/, function () {
    locationFilterArrow.click();
    browser.sleep(1000);
    return locationCityDebrecen.click();
  });

  When('Belarus and Minsk selected in the location filter box', function () {
    locationFilterArrow.click();
    browser.sleep(1000);
    browser.actions().mouseMove(locationCountryBelarus).click().perform();
    browser.sleep(1000);
    return locationCityMinsk.click();
  });

  When(/Software Architecture selected in the department filter box/, function () {
    departmentFilterArrow.click();
    browser.sleep(1000);
    departmentFilterSA.click();
    return browser.sleep(1000);
  });

  When(/Software Test Engineering selected in the department filter box/, function () {
    departmentFilterArrow.click();
    browser.sleep(1000);
    departmentFilterSTE.click();
    return browser.sleep(1000);
  });

  When(/the search button is clicked/, function () {
    const submitButton = element(by.css(".recruiting-search__submit"));
    return submitButton.click();
  });

  When(/the apply button for Test Automation Engineer is clicked/, function () {
    const applyButtonSTE = element(by.css(applyButtonSelectorSTE));
    return applyButtonSTE.click();
  });

  When(/the apply button for Digital Solutions Architect is clicked/, function () {
    const applyButtonSA = element(by.css(applyButtonSelectorSA));
    return applyButtonSA.click();
  });

  //Thens
  Then(/the cookie bar should be closed/, function () {
    return browser.isElementPresent(by.css(".cookie-disclaimer__button"))
        .then(isPresent => {
            if (isPresent) {
                const cookieButton = element(by.css(".cookie-disclaimer__button"));
                cookieButton.click();
            }
        });
  });

  // Then(/the "(.*)" should be visible by (css|xpath)/, function (selector, type) {
  //   const selectedElement = (type === "css") ? element(by.css(selector)) : element(by.xpath(selector));
  //   console.log(selector);
  //   console.log(type);
  //   return expect(selectedElement.isPresent()).to.eventually.be.true;
  // });

  Then(/the logo should be visible/, function () {
    const logoSelector = element(by.css(logo));
    return expect(logoSelector.isPresent()).to.eventually.be.true;
  });

  Then(/search form should be visible/, function () {
    const careerPageSearchForm = element(by.css(".recruiting-search__form"));
    return expect(careerPageSearchForm.isPresent()).to.eventually.be.true;
  });

  Then(/the Debrecen should be selected/,async function () {
    const selectedCity = await element(by.css(selectedCityFieldSelector)).getText();
    return expect(selectedCity).to.equal("Debrecen");
  });

  Then(/the Minsk should be selected/, async function () {
    const selectedCity = await element(by.css(selectedCityFieldSelector)).getText();
    return expect(selectedCity).to.equal("Minsk");
  });

  Then(/the Software Test Engineering should be selected/, async function () {
    const selectedDepartment = await element(by.css(selectedDepartmentFieldSelectorSTE)).getText();
    return expect(selectedDepartment).to.equal("Software Test Engineering".toUpperCase());
  });

  Then(/the Software Architecture should be selected/, async function () {
    const selectedDepartment = await element(by.css(selectedDepartmentFieldSelectorSA)).getText();
    return expect(selectedDepartment).to.equal("Software Architecture".toUpperCase());
  });

  Then(/should have a proper job found for Test Automation Engineer/, async function () {
    browser.actions().mouseMove(jobFoundSTE).perform();
    const jobResult = await element(by.css(jobResultSelectorSTE)).getText();
    return expect(jobResult).to.equal("Test Automation Engineer");
  });

  Then(/should have a proper job found for Digital Solutions Architect/, async function () {
    browser.actions().mouseMove(jobFoundSA).perform();
    const jobResult = await element(by.css(jobResultSelectorSA)).getText();
    return expect(jobResult).to.equal("Digital Solutions Architect");
  });

  Then(/should have Test Automation Engineer the proper location Debrecen, Hungary/, async function () {
    const jobLocation = await element(by.css(jobLocationSelectorSTE)).getText();
    return expect(jobLocation.includes("Debrecen".toUpperCase())).to.be.true;
  });

  Then(/should have Digital Solutions Architect the proper location Minsk, Belarus/, async function () {
    const jobLocation = await element(by.xpath(jobLocationSelectorSA)).getText();
    return expect(jobLocation.includes("Minsk".toUpperCase())).to.be.true;
  });

  Then(/should have Test Automation Engineer with description/, function () {
    const jobDescription = element(by.css(jobDescriptionSelectorSTE));
    browser.sleep(5000);
    return expect(jobDescription.isPresent()).to.eventually.be.true;
  });

  Then(/should have Digital Solutions Architect with description/, function () {
    const jobDescription = element(by.css(jobDescriptionSelectorSA));
    browser.sleep(5000);
    return expect(jobDescription.isPresent()).to.eventually.be.true;
  });

  Then(/should have Test Automation Engineer apply button/, function () {
    const jobResultApplyButton = element(by.css(applyButtonSelectorSTE));
    return expect(jobResultApplyButton.isPresent()).to.eventually.be.true;
  });

  Then(/should have Digital Solutions Architect apply button/, function () {
    const jobResultApplyButton = element(by.css(applyButtonSelectorSA));
    return expect(jobResultApplyButton.isPresent()).to.eventually.be.true;
  });

  Then(/should have description in the position of Test Automation Engineer/, async function () {
    const positionDescription = await element(by.css("h1")).getText();
    return expect(positionDescription.includes("Test Automation Engineer")).to.be.true;
  });

  Then(/should have description in the position of Digital Solutions Architect/, async function () {
    const positionDescription = await element(by.css("h1")).getText();
    return expect(positionDescription.includes("Digital Solutions Architect")).to.be.true;
  });

  Then(/should have Debrecen or Hungary in the description/, async function () {
    const locationDescription = await element(by.css(".recruiting-page__location")).getText();
    return expect(locationDescription.includes("Debrecen")).to.be.true;
  });

  Then(/should have Minsk or Belarus in the description/, async function () {
    const locationDescription = await element(by.css(".recruiting-page__location")).getText();
    return expect(locationDescription.includes("Minsk")).to.be.true;
  });