class JobResultsPage {
    constructor(testData) {
        const format = (testData.positionName).toLowerCase().split(" ").join("-");
        this.jobResultSelector = element(by.css(`a.search-result__item-name[href*='.${format}']`));
        this.jobLocation = element(by.css(`.search-result__item:nth-of-type(${testData.hit}) .search-result__location`));
        this.jobDescription = element(by.css(`.search-result__item:nth-of-type(${testData.hit}) .search-result__item-description`));
        this.applyButton = element(by.css(`a.search-result__item-apply[href*='.${format}']`));
    }

    scrollToResult() {
        return browser.actions().mouseMove(this.jobResultSelector).perform();
    }

    async getPositionName() {
        return await this.jobResultSelector.getText();
    }

    async getLocationOfJob() {
        return await this.jobLocation.getText();
    }

    applyToPosition() {
        return this.applyButton.click();
    }
}

module.exports = JobResultsPage;