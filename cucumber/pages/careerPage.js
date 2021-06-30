const { element, browser, protractor, ProtractorExpectedConditions } = require("protractor");

/**
 * @type {ProtractorExpectedConditions}
 */
const EC = protractor.ExpectedConditions;

class CareerPage {
    constructor() {
        this.url = "https://www.epam.com/careers";
        this.cookieBar = ".cookie-disclaimer__button";
        this.logo = element(by.css(".header__logo"));
        this.searchForm = element(by.css(".recruiting-search__form"));
        this.locationFilterArrow = element(by.css(".select2-selection__arrow"));
        this.departmentFilterArrow = element(by.css(".selected-params"));
        this.selectedCityFieldSelector = element(by.css(".select2-selection__rendered"));
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

    async selectLocation(country, city) {
        const locationCountry = element(by.css(`li[aria-label="${country}"]`));
        const locationCity = element(by.css(`[id*="${city}"]`));
        this.locationFilterArrow.click();
        const countryClasses = await locationCountry.getAttribute('class');
        const splittedClasses = countryClasses.split(' ');
        if (splittedClasses.indexOf('dropdown-cities') === -1) {
            browser.sleep(1000);
            browser.actions().mouseMove(locationCountry).click().perform();
        } 
        browser.wait(EC.elementToBeClickable(locationCity),5000);
        return locationCity.click();
    }

    async getSelectedCity() {
        return await this.selectedCityFieldSelector.getText();
    }

    selectDepartment(department) {
        const departmentFilter = element(by.xpath(`//span[contains(text(),'${department}')]`));
        this.departmentFilterArrow.click();
        browser.wait(EC.elementToBeClickable(departmentFilter), 5000);
        return departmentFilter.click()
    }

    async getSelectedDepartment(department) {
        const selectedDepartmentFieldSelector = element(by.css(`li[data-value="${department}"]`));
        browser.wait(EC.textToBePresentInElement(selectedDepartmentFieldSelector, department.toUpperCase()), 5000);
        return await selectedDepartmentFieldSelector.getText();
    }

    async submitSearch() {
        return this.button.click();
    }
}

module.exports = CareerPage;