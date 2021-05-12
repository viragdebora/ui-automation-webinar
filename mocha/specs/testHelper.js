const { browser } = require("protractor");

function departmentDecision(department) {
    const departmentFilterForSTE = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[3]/section[1]/div[1]/div[2]/div[1]/form[1]/div[3]/div[1]/div[2]/div[1]/ul[2]/li[5]/label[1]/span[1]"));
    const departmentFilterForSA = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[3]/section[1]/div[1]/div[2]/div[1]/form[1]/div[3]/div[1]/div[2]/div[1]/ul[2]/li[3]/label[1]/span[1]"));
    switch(department) {
        case "Software Test Engineering": return departmentFilterForSTE;
        case "Software Architecture": return departmentFilterForSA;
    }
}

function departmentByLocation(department, location) {
    const locationFilterArrow = element(by.css(".select2-selection__arrow"));
    const locationCity = element(by.css(`[id*="${location}"`));
    const departmentFilterArrow = element(by.css(".selected-params"));
    const submitButton = element(by.css(".recruiting-search__submit"));

    browser.sleep(1000);
    locationFilterArrow.click();
    browser.sleep(1000);
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
    const applyButton = element(by.css("a.search-result__item-apply[href*='.test-automation-engineer']"));
    departmentByLocation(department, location);
    browser.sleep(2000);
    applyButton.click();
}

module.exports = {departmentByLocation, jobApplication};