import help from '../helpers/help.linkedin';
import fs from 'fs';

const sel = {
    plusIcon: '//li-icon[@type="plus-icon"]/../../button',
    showMore: '//button[@data-control-name="skill_details"]',
    endorseLevel: '.pv-endorsement-followup__radio-label-text',
    relationDropDown: '//select[@class="pv-endorsement-followup__select mb3"]',
    submitButton: '//span[text()="Submit"]',
    loginEmail: '//input[@name="session_key"]',
    loginPass: '//input[@name="session_password"]',
    signinButton: '//button[@class="sign-in-form__submit-btn"]',
    scrollTo: '//div[@id="artdeco-hoverable-outlet"]',
    scrollTo2: '//h2[text()= "Skills & Endorsements"]/../..',
    h1: '//h1',
    scrollTo3: '//ul[@id="highlights-container"]',
    name: '.inline.t-24.t-black.t-normal.break-words',
    connect: '.dist-value',
};
const filePath = 'linkedinData.txt';

const data = {
    urlMain: 'https://www.linkedin.com/',
    profileURLs: fs.readFileSync(filePath).toString().split('\n'),
    userEmail: help.eml, // enter your own email
    userPass: help.passw, // enter your own password
};
describe("Auto endorse tool", () => {
    before(() => {
        browser.url(data.urlMain);
        //browser.maximizeWindow();
        $(sel.loginEmail).waitForDisplayed(5000);
        $(sel.loginEmail).setValue(data.userEmail);
        $(sel.loginPass).setValue(data.userPass);
        $(sel.signinButton).click();
        browser.waitUntil(() => {
            return $(sel.h1).isDisplayed(5000);
        });
    });
    data.profileURLs.map(userLink => {
        it('redirect to user profile', () => {
            browser.url(userLink);
            browser.waitUntil(() => {
                return $(sel.h1).isDisplayed(5000);
            });
        });
        it('go to user profile', () => {
            $(sel.scrollTo).waitForExist(5000);
            let selector = $(sel.scrollTo);
            browser.execute( (selector) => {
                selector.scrollIntoView({behavior: "smooth", block: "end"});
            }, selector);
            $(sel.showMore).waitForExist(5000);
            selector = $(sel.showMore);
            browser.execute( (selector) => {
                selector.scrollIntoView({behavior: "smooth", block: "end"});
            }, selector);
            $(sel.showMore).waitForDisplayed(5000);
            $(sel.showMore).moveTo();
            selector = $(sel.showMore);
            browser.execute( (selector) => {
                selector.click();
            }, selector);
        });
        it('endorse user skills', () => {
            const name = $(sel.name).getText();
            const connect = $$(sel.connect)[0].getText();
            const allSkills = $$(sel.plusIcon);
            if (connect !== "1st") {
                console.log(`${name} not connected`);
            }
            else if (allSkills.length) {
                allSkills.forEach(element => {
                    element.scrollIntoView(false);
                    element.moveTo();
                    element.waitForDisplayed(5000, false, `${name} error`);
                    element.click();
                    $(sel.endorseLevel).waitForDisplayed(5000);
                    const endorseLvls = $$(sel.endorseLevel);
                    const index = Math.floor(Math.random() * endorseLvls.length);
                    const lvl = endorseLvls[index];
                    lvl.waitForDisplayed(5000);
                    lvl.click();
                    $(sel.submitButton).waitForEnabled(5000);
                    $(sel.submitButton).click();
                })
            }
            else {
                console.log(`${name} endorsed`);
            }
        });
    });
});