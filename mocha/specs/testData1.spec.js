const testData1 = {
    country : "Hungary",
    city: "Debrecen",
    department: "Software Test Engineering",
    positionName: "Test Automation Engineer"
};

const expect = require('chai').expect;
const EC = protractor.ExpectedConditions;
const {departmentByLocation, jobApplication, cookieSegmentClose} = require("./testHelper");
const careerPageURL = "https://www.epam.com/careers";
const careerPageLogo = element(by.css(".header__logo"));
const careerPageSearchForm = element(by.css(".recruiting-search__form"));
const locationFilterArrow = element(by.css(".select2-selection__arrow"));
const locationCity = element(by.css(`[id*="${testData1.city}"`));
const departmentFilterArrow = element(by.css(".selected-params"));
const departmentFilter = element(by.xpath("//span[contains(text(),'Software Test Engineering')]"));
const selectedCityFieldSelector = ".select2-selection__rendered";
const selectedDepartmentFieldSelector = `li[data-value="${testData1.department}"]`;
const jobResultSelector = "a.search-result__item-name[href*='.test-automation-engineer']";
const jobLocationSelector = "/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[5]/div[1]/strong[1]";
const jobDescriptionSelector = "//p[contains(text(),'Test Automation Engineer')]";
const applyButtonSelector = "a.search-result__item-apply[href*='.test-automation-engineer']";

describe("Search for Test Automation Engineer in Debrecen", function() {
    this.timeout(GLOBAL_TIMEOUT);
    beforeEach(() => {
        browser.get(careerPageURL);
        cookieSegmentClose();
    });

    describe("Career page", () => {
        it("should be opened", () => {
            return expect(careerPageLogo.isPresent()).to.eventually.be.true;
        });
    });

    describe("Search form", () => {
        it("should be displayed", () => {
            return expect(careerPageSearchForm.isPresent()).to.eventually.be.true;
        });

        describe("Location filter box", () => {
            beforeEach(() => {
                locationFilterArrow.click();
                EC.visibilityOf(locationCity);
                locationCity.click();
            });
            it("should provide a way to filter to a specific location", async() => {
                const selectedCity = await element(by.css(selectedCityFieldSelector)).getText();
                return expect(selectedCity).to.equal(testData1.city);
            });
        });

        describe("Department filter box", () => {
            beforeEach(() => {
                departmentFilterArrow.click();
                EC.visibilityOf(departmentFilter);
                departmentFilter.click();
            });
            it("should select one skill", async() => {
                const selectedSkill = await element(by.css(".counter")).getText();
                return expect(selectedSkill).to.equal("1");
            });
            it("should provide a way to filter to a specific department", async() => {
                const selectedDepartment = await element(by.css(selectedDepartmentFieldSelector)).getText();
                return expect(selectedDepartment).to.equal(testData1.department.toUpperCase());
            });
        });

        describe("Searching", () => {
            beforeEach(() => {
                departmentByLocation(testData1.department, testData1.city);
                const jobFound = element(by.xpath("/html[1]/body[1]/div[2]/main[1]/div[1]/div[1]/section[1]/div[2]/div[1]/div[1]/section[2]/ul[1]/li[5]"));
                browser.actions().mouseMove(jobFound).perform();
            });
            it("should have a proper job found", async() => {
                const jobResult = await element(by.css(jobResultSelector)).getText();
                return expect(jobResult).to.equal(testData1.positionName);
            });
            it("should have job with proper location", async() => {
                const jobLocation = await element(by.xpath(jobLocationSelector)).getText();
                return expect(jobLocation.includes(testData1.city.toUpperCase())).to.be.true;
            });
            it("should have job with description", () => {
                const jobDescription = element(by.xpath(jobDescriptionSelector));
                return expect(jobDescription.isPresent()).to.eventually.be.true;
            });
            it("should have apply button for job", () => {
                const jobResultApplyButton = element(by.css(applyButtonSelector));
                return expect(jobResultApplyButton.isPresent()).to.eventually.be.true;
            });
        });

        describe("Applying to position", () => {
            beforeEach(() => {
                return jobApplication(testData1.department, testData1.city);
            });
            it("should have a proper position name in the description", async() => {
                const positionDescription = await element(by.css("h1")).getText();
                return expect(positionDescription.includes(testData1.positionName)).to.be.true;
            });
            it("should have a proper location in the description", async() => {
                const locationDescription = await element(by.css(".recruiting-page__location")).getText();
                return expect(locationDescription.includes(testData1.city)).to.be.true;
            });
        });
    });
});