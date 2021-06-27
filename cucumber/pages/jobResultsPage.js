const { browser, protractor } = require("protractor");
const EC = protractor.ExpectedConditions;

class JobResultsPage {
    constructor() {
        this.jobLocation = ".search-result__location";
        this.jobDescription = ".search-result__item-description";
    }

    format(positionName) {
        return positionName.toLowerCase().split(" ").join("-");
    }

    jobResultSelector(formatPositionName) {
        return element(by.css(`a.search-result__item-name[href*='.${formatPositionName}']`));
    }

    searchResultItem(hit) {
        return `.search-result__item:nth-of-type(${hit})`;
    }

    scrollToResult(positionName) {
        const selector = this.jobResultSelector(this.format(positionName));
        browser.wait(EC.visibilityOf(selector), 5000);
        return browser.actions().mouseMove(selector).perform();
    }

    async getPositionName(positionName) {
        const selector = this.jobResultSelector(this.format(positionName));
        return await selector.getText();
    }

    async getLocationOfJob(hit) {
        const location = element(by.css(`${this.searchResultItem(hit)} ${this.jobLocation}`));
        return await location.getText();
    }

    getJobDescription(hit) {
        return element(by.css(`${this.searchResultItem(hit)} ${this.jobDescription}`));
    }

    getApplyButton(position) {
        return element(by.css(`a.search-result__item-apply[href*='.${this.format(position)}']`));
    }

    applyToPosition(positionName) {
        return this.getApplyButton(positionName).click();
    }
}

module.exports = JobResultsPage;