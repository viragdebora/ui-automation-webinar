const { browser } = require("protractor");
const EC = protractor.ExpectedConditions;

function cookieSegmentClose() {
    browser.isElementPresent(by.css(".cookie-disclaimer__button"))
        .then(isPresent => {
            if (isPresent) {
                const cookieButton = element(by.css(".cookie-disclaimer__button"));
                cookieButton.click();
            }
        });
}

function departmentDecision(department) {
    const departmentFilterForSTE = element(by.xpath("//span[contains(text(),'Software Test Engineering')]"));
    const departmentFilterForSA = element(by.xpath("//span[contains(text(),'Software Architecture')]"));
    switch(department) {
        case "Software Test Engineering": return departmentFilterForSTE;
        case "Software Architecture": return departmentFilterForSA;
    }
}

function departmentByLocation(department, location) {
    const jobSearchFilterForm = element(by.xpath("//body/div[@id='wrapper']/main[@id='main']/div[1]/div[3]/div[1]"));
    const locationFilterArrow = element(by.css(".select2-selection__arrow"));
    const locationCountry = element(by.xpath("//strong[contains(text(),'Belarus')]"));
    const locationCity = element(by.css(`[id*="${location}"`));
    const departmentFilterArrow = element(by.css(".selected-params"));
    const submitButton = element(by.css(".recruiting-search__submit"));
    
    browser.actions().mouseMove(jobSearchFilterForm).perform();
    browser.sleep(1000);
    locationFilterArrow.click();
    browser.sleep(1000);
    if(location === "Minsk") {
        browser.actions().mouseMove(locationCountry).click().perform();
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

function scrollToElement(department) {
    const steElement = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[5]"));
    const aaElement = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[2]"));
    switch(department) {
        case "Software Test Engineering": browser.actions().mouseMove(steElement).perform(); break;
        case "Software Architecture": browser.actions().mouseMove(aaElement).perform(); break;
    }
}

function jobApplication(department, location) {
    const applyButtonSTE = element(by.css("a.search-result__item-apply[href*='.test-automation-engineer']"));
    const applyButtonAA = element(by.css("a.search-result__item-apply[href*='.azure-architect']"));
    departmentByLocation(department, location);
    scrollToElement(department);
    browser.sleep(2000);
    switch(department) {
        case "Software Test Engineering": applyButtonSTE.click(); break;
        case "Software Architecture": applyButtonAA.click(); break;
    }
}

module.exports = {departmentByLocation, jobApplication, cookieSegmentClose};