const { browser } = require("protractor");

function departmentDecision(department) {
    const departmentFilterForSTE = element(by.xpath("//span[contains(text(),'Software Test Engineering')]"));
    const departmentFilterForSA = element(by.xpath("//span[contains(text(),'Software Architecture')]"));
    switch(department) {
        case "Software Test Engineering": return departmentFilterForSTE;
        case "Software Architecture": return departmentFilterForSA;
    }
}

function departmentByLocation(department, location) {
    const locationFilterArrow = element(by.css(".select2-selection__arrow"));
    const locationCountry = element(by.xpath("//strong[contains(text(),'Belarus')]"));
    const locationCity = element(by.css(`[id*="${location}"`));
    const departmentFilterArrow = element(by.css(".selected-params"));
    const submitButton = element(by.css(".recruiting-search__submit"));

    browser.sleep(1000);
    locationFilterArrow.click();
    browser.sleep(1000);
    if(location === "Minsk") {
        browser.sleep(3000);
        locationCountry.click();
        browser.sleep(1000); 
    }
    locationCity.click();
    browser.sleep(1000);
    departmentFilterArrow.click();
    browser.sleep(1000);
    departmentDecision(department).click();
    browser.sleep(1000);
    submitButton.click();
    browser.sleep(2000);
}

function jobApplication(department, location) {
    const applyButtonSTE = element(by.css("a.search-result__item-apply[href*='.test-automation-engineer']"));
    const applyButtonAA = element(by.css("a.search-result__item-apply[href*='.azure-architect']"));
    departmentByLocation(department, location);
    browser.sleep(2000);
    switch(department) {
        case "Software Test Engineering": applyButtonSTE.click(); break;
        case "Software Architecture": applyButtonAA.click(); break;
    }
}

module.exports = {departmentByLocation, jobApplication};