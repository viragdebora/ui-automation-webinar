const testData1 = {
    country : "Hungary",
    city: "Debrecen",
    department: "Software Test Engineering",
    positionName: "Test Automation Engineer"
};

const testData2 = {
    country : "Belarus",
    city: "Minsk",
    department: "Software Architecture",
    positionName: "Test Automation Architect"
};

const expect = require('chai').expect;
const {departmentByLocation} = require("./testHelper");
const careerPageURL = "https://www.epam.com/careers";
const careerPageLogo = element(by.css(".header__logo"));
const careerPageSearchForm = element(by.css(".recruiting-search__form"));
const locationFilterArrow = element(by.css(".select2-selection__arrow"));
const locationCity = element(by.css('[id*="Debrecen"'));
const departmentFilterArrow = element(by.css(".selected-params"));
const departmentInputField = element(by.css(".recruiting-search__input"));

describe("Search for job", function() {
    this.timeout(GLOBAL_TIMEOUT);
    beforeEach(() => {
        return browser.get(careerPageURL);
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
                browser.sleep(1000);
                locationCity.click();
                browser.sleep(1000);
            });
            it("should provide a way to filter to a specific location", async() => {
                const selectedCity = await element(by.css(".select2-selection__rendered")).getText();
                return expect(selectedCity).to.equal("Debrecen");
            });
        });

        describe("Department filter box", () => {
            beforeEach(() => {
                departmentInputField.sendKeys(testData1.positionName);
                //browser.sleep(1000);
            });
            it("should provide a way to filter to a specific department", async() => {
                const selectedDepartmentElement = await element(by.css(".recruiting-search__input"));
                const value = await selectedDepartmentElement.getAttribute('value');
                return expect(value).to.equal(testData1.positionName);
            });
        });

        describe("Searching", () => {
            beforeEach(() => {
                departmentByLocation(testData1.positionName, testData1.city);
            });
            it("should have a proper job found", () => {});
            it("should have job with proper department", () => {});
            it("should have job with proper location", () => {});
            it("should have apply button for job", () => {});
        });

        describe.skip("Applying to position", () => {
            beforeEach(() => {
                return browser.get("https://www.epam.com/careers/job-listings/job.19100.test-automation-engineer_debrecen_hungary");
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