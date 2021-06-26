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
        return browser.actions().mouseMove(selector).perform();
    }

    async getPositionName(positionName) {
        const selector = this.jobResultSelector(this.format(positionName));
        console.log(selector.getText());
        return await selector.getText();
    }

    async getLocationOfJob(hit) {
        const location = element(by.css(`${this.searchResultItem(hit)} ${this.jobLocation}`));
        console.log(location);
        return await location.getText();
    }

    getJobDescription(hit) {
        return element(by.css(`${this.searchResultItem(hit)} ${this.jobDescription}`));
    }

    getApplyButton(position) {
        return element(by.css(`a.search-result__item-apply[href*='.${format(position)}']`));
    }

    applyToPosition(positionName) {
        return this.getApplyButton(positionName).click();
    }
}

module.exports = JobResultsPage;