'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const { browser, element } = require('protractor');
setDefaultTimeout(GLOBAL_TIMEOUT);

const locationFilterArrow = element(by.css(".select2-selection__arrow"));
const selectedCityFieldSelector = ".select2-selection__rendered";
const departmentFilterArrow = element(by.css(".selected-params"));

  //Givens
  Given(/the career page is opened/, function () {
    return browser.get("https://www.epam.com/careers");
  });

  //Whens
  When(/(.*) and (.*) selected in the location filter box/, function (country, city) {
    const locationCountry = element(by.xpath(`//strong[contains(text(),'${country}')]`));
    const locationCity = element(by.css(`[id*="${city}"]`));
    locationFilterArrow.click();
    browser.sleep(1000);
    if (city === "Minsk") {
      browser.actions().mouseMove(locationCountry).click().perform();
    }
    browser.sleep(1000);
    return locationCity.click();
  });

  When(/(.*) selected in the department filter box/, function (department) {
    const departmentFilter = element(by.xpath(`//span[contains(text(),'${department}')]`));
    departmentFilterArrow.click();
    browser.sleep(1000);
    departmentFilter.click();
    return browser.sleep(1000);
  });

  When(/the search button is clicked/, function () {
    const submitButton = element(by.css(".recruiting-search__submit"));
    return submitButton.click();
  });

  When(/the apply button for (.*) is clicked/, function (positionName) {
    const form = positionName.toLowerCase().split(" ").join("-");
    const applyButtonSelector = `a.search-result__item-apply[href*='.${form}']`;
    const applyButton = element(by.css(applyButtonSelector));
    return applyButton.click();
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

  Then(/the "(.*)" should be visible/, function (selector) {
    const logo = ".header__logo";
    const search_form = ".recruiting-search__form";
    const selectedElement = (selector === "logo") ? element(by.css(logo)) : element(by.css(search_form));
    return expect(selectedElement.isPresent()).to.eventually.be.true;
  });

  Then(/the (.*) location should be selected/,async function (city) {
    const selectedCity = await element(by.css(selectedCityFieldSelector)).getText();
    return expect(selectedCity).to.equal(city);
  });

  Then(/the (.*) department should be selected/, async function (department) {
    const selectedDepartmentFieldSelector = `li[data-value="${department}"]`;
    const selectedDepartment = await element(by.css(selectedDepartmentFieldSelector)).getText();
    return expect(selectedDepartment).to.equal(department.toUpperCase());
  });

  Then(/should have a proper job found for (.*) position/, async function (positionName) {
    const form = positionName.toLowerCase().split(" ").join("-");
    const jobResultSelector = element(by.css(`a.search-result__item-name[href*='.${form}']`));
    browser.actions().mouseMove(jobResultSelector).perform();
    //const jobResult = await jobResultSelector.getText();
    return expect(await jobResultSelector.getText()).to.equal(positionName);
  });

  Then(/the proper location in the (\d+)th result should be (.*)/, async function (hit, city) {
    const jobLocationSelector = `.search-result__item:nth-of-type(${hit}) .search-result__location`;
    const jobLocation = await element(by.css(jobLocationSelector)).getText();
    return expect(jobLocation.includes(city.toUpperCase())).to.be.true;
  });

  Then(/in the (\d+)th result description should be visible/, function (hit) {
    const jobDescriptionSelector = `.search-result__item:nth-of-type(${hit}) .search-result__item-description`;
    const jobDescription = element(by.css(jobDescriptionSelector));
    return expect(jobDescription.isPresent()).to.eventually.be.true;
  });

  Then(/apply button should be visible for (.*) position/, function (positionName) {
    const form = positionName.toLowerCase().split(" ").join("-");
    const applyButtonSelector = `a.search-result__item-apply[href*='.${form}']`;
    const jobResultApplyButton = element(by.css(applyButtonSelector));
    return expect(jobResultApplyButton.isPresent()).to.eventually.be.true;
  });

  Then(/should have (.*) position name in the job description/, async function (positionName) {
    const positionDescription = await element(by.css("h1")).getText();
    return expect(positionDescription.includes(positionName)).to.be.true;
  });

  Then(/should have (.*) city in the job description/, async function (city) {
    const locationDescription = await element(by.css(".recruiting-page__location")).getText();
    return expect(locationDescription.includes(city)).to.be.true;
  });