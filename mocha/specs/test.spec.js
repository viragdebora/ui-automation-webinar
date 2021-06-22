const input = require('../test-data-files/input.json');
const CareerPage = require('../pages/careerPage');
const careerPage = new CareerPage(input[0]);
const JobResultsPage = require('../pages/jobResultsPage');
const jobResultsPage = new JobResultsPage(input[0]);
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
                return expect(await careerPage.getSelectedCity()).to.equal(input[0].city);
            });
        });
        describe("Department filter box", () => {
            beforeEach(() => {
                careerPage.selectDepartment();
            });
            it("should provide a way to filter to a specific department", async() => {
                return expect(await careerPage.getSelectedDepartment()).to.equal(input[0].department.toUpperCase());
            });
        });
        describe.only("Searching", () => {
            beforeEach(() => {
                careerPage.submitSearch();
                jobResultsPage.scrollToResult();
            });
            it("should have a proper job found", () => {
                return expect(jobResultsPage.jobResultSelector.isPresent()).to.eventually.be.true;
            });
            it("should have job with proper location", async() => {
                const locationOfJob = await jobResultsPage.getLocationOfJob();
                return expect(locationOfJob.includes(input[0].city.toUpperCase())).to.be.true;
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
            careerPage.submitSearch()
            jobResultsPage.scrollToResult();
            jobResultsPage.applyToPosition();
        });
        it("should have a proper position name in the description", async () => {
            return expect((await jobPage.getPositionName()).includes(input[0].positionName)).to.be.true;
        });
        it("should have a proper location in the description", async () => {
            return expect((await jobPage.getLocation()).includes(input[0].city)).to.be.true;
        });
    });
});