const { browser } = require("protractor");

function departmentByLocation(department, location) {
    const locationFilterArrow = element(by.css(".select2-selection__arrow"));
    const locationCity = element(by.css(`[id*="${location}"`));
    const departmentInputField = element(by.css(".recruiting-search__input"));
    const submitButton = element(by.css(".recruiting-search__submit"));

    locationFilterArrow.click();
    browser.sleep(1000);
    locationCity.click();
    browser.sleep(1000);
    departmentInputField.sendKeys(department);
    browser.sleep(1000);
    submitButton.click();
    browser.sleep(2000);
}

// function findJob(department) {
//     const departmentList = element(by.css("[role='treeitem']"));
//     departmentList.forEach(i => {
//         let act = element(by.css("[role='treeitem']"))[i].innerText;
//         if (act === department) {
            
//         }
//     });
// }

module.exports = {departmentByLocation};