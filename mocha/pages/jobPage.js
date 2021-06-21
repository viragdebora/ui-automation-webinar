class JobPage {
    constructor() {
        this.positionName = element(by.css("h1"));
        this.location = element(by.css(".recruiting-page__location"));
    }

    async getPositionName() {
        return await this.positionName.getText();
    }

    async getLocation() {
        return await this.location.getText();
    }
}

module.exports = JobPage;