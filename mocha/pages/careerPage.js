const { element, browser } = require("protractor");
const expect = require('chai').expect;

class CareerPage {
    constructor(testData) {
        this.url = "https://www.epam.com/careers";
        this.cookieBar = ".cookie-disclaimer__button";
        this.logo = element(by.css(".header__logo"));
        this.searchForm = element(by.css(".recruiting-search__form"));
        this.locationFilterArrow = element(by.css(".select2-selection__arrow"));
        this.locationCity = element(by.css(`[id*="${testData.city}"`));
        this.locationCountry = element(by.css(`li[aria-label="${testData.country}"`));
        this.departmentFilterArrow = element(by.css(".selected-params"));
        this.departmentFilter = element(by.xpath(`//span[contains(text(),'${testData.department}')]`));
        this.selectedCityFieldSelector = element(by.css(".select2-selection__rendered"));
        this.selectedDepartmentFieldSelector = element(by.css(`li[data-value="${testData.department}"]`));
        this.button = element(by.css(".recruiting-search__submit"));
    }

    load() {
        return browser.get(this.url);
    }

    cookieClose() {
        browser.isElementPresent(by.css(this.cookieBar))
            .then(isPresent => {
                if (isPresent) {
                    const cookieButton = element(by.css(this.cookieBar));
                    cookieButton.click();
                }
            });
    }

    async selectLocation() {
        this.locationFilterArrow.click();
        browser.sleep(1000);
        const countryClasses = await this.locationCountry.getAttribute('class');
        const splittedClasses = countryClasses.split(' ');
        if (splittedClasses.indexOf('dropdown-cities') === -1) {
            browser.actions().mouseMove(this.locationCountry).click().perform();
        } 
        browser.sleep(1000);
        return this.locationCity.click();
    }

    async getSelectedCity() {
        return await this.selectedCityFieldSelector.getText();
    }

    selectDepartment() {
        this.departmentFilterArrow.click();
        browser.sleep(1000);
        this.departmentFilter.click();
    }

    async getSelectedDepartment() {
        return await this.selectedDepartmentFieldSelector.getText();
    }

    async submitSearch() {
        await this.selectLocation();
        this.selectDepartment();
        return this.button.click();
    }
}

module.exports = CareerPage;