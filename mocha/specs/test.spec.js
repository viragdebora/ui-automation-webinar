const testData1 = {
    country : "Hungary",
    city: "Debrecen",
    department: "Software Test Engineering",
    positionName: "Test Automation Engineer",
    hit: "5"
};

const CareerPage = require('../pages/careerPage');
const careerPage = new CareerPage(testData1);
const JobResultsPage = require('../pages/jobResultsPage');
const jobResultsPage = new JobResultsPage(testData1);
const JobPage = require('../pages/jobPage');
const jobPage = new JobPage();

describe("Search for job", function() {
    this.timeout(GLOBAL_TIMEOUT);
    beforeEach(() => {
        careerPage.load();
        return careerPage.cookieClose();
    });
    describe("Career page", () => {
        it("should be opened", () => {
            return expect(careerPage.logo.isPresent()).to.eventually.be.true;
        });
    });
    describe("Search form", () => {
        it("should be displayed", () => {
            return expect(careerPage.searchForm.isPresent()).to.eventually.be.true;
        });
        describe("Location filter box", () => {
            beforeEach(async () => {
                await careerPage.selectLocation();
            });
            it("should provide a way to filter to a specific location", async() => {
                return expect(await careerPage.getSelectedCity()).to.equal(testData1.city);
            });
        });
        describe("Department filter box", () => {
            beforeEach(() => {
                careerPage.selectDepartment();
            });
            it("should provide a way to filter to a specific department", async() => {
                return expect(await careerPage.getSelectedDepartment()).to.equal(testData1.department);
            });
        });
        describe("Searching", () => {
            beforeEach(async() => {
                await careerPage.selectLocation();
                careerPage.selectDepartment();
                careerPage.submitSearch();
                jobResultsPage.scrollToResult();
            });
            it("should have a proper job found", async() => {
                return expect(await jobResultsPage.getPositionName()).to.equal(testData1.positionName);
            });
            it("should have job with proper location", async() => {
                return expect(await jobResultsPage.getLocationOfJob().includes(testData1.city.toUpperCase())).to.be.true;
            });
            it("should have job with description", () => {
                return expect(jobResultsPage.jobDescription.isPresent()).to.eventually.be.true;
            });
            it("should have apply button for job", () => {
                return expect(jobResultsPage.applyButton.isPresent()).to.eventually.be.true;
            });
        });
    });
    describe("Applying to position", () => {
        beforeEach(() => {
            careerPage.selectLocation();
            careerPage.selectDepartment();
            careerPage.submitSearch();
            jobResultsPage.scrollToResult();
            return jobResultsPage.applyToPosition();
        })
        it("should have a proper position name in the description", () => {
            return expect(jobPage.getPositionName.includes(testData1.city)).to.be.true;
        });
        it("should have a proper location in the description", () => {
            return expect(jobPage.getLocation.includes(testData1.city)).to.be.true;
        });
    });
});