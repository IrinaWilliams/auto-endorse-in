import help from '../helpers/help.linkedin';
import fs from 'fs';

const sel = {
    plusIcon: 'li-icon[type*=plus-icon]',
    showMore: 'button[data-control-name=skill_details]',
    endorseLevel: '(.pv-endorsement-followup__radio-label-text)[2]',
    relationDropDown: '//select[@class="pv-endorsement-followup__select mb3"]',
    submitButton: '//span[text()="Submit"]',
    loginEmail: '//input[@name="session_key"]',
    loginPass: '//input[@name="session_password"]',
    signinButton: '//button[@class="sign-in-form__submit-btn"]',
    scrollTo: '//div[@id="artdeco-hoverable-outlet"]',
    scrollTo2: '//h2[text()= "Skills & Endorsements"]/../..',
    h1: '//h1',
    scrollTo3: '//ul[@id="highlights-container"]',
};

const filePath = 'linkedinData.txt';

const data = {
    urlMain: 'https://www.linkedin.com/',
    profileURLs: fs.readFileSync(filePath).toString().split('\n'),
    userEmail: help.eml, // enter your own email
    userPass: help.passw, // enter your own password
}

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
            $(sel.scrollTo).scrollIntoView({behavior: "smooth", block: "end"});
            $(sel.scrollTo3).waitForExist(5000);
            $(sel.scrollTo3).scrollIntoView({behavior: "smooth", block: "start"});
            $(sel.scrollTo2).waitForExist(5000);
            $(sel.scrollTo2).scrollIntoView({behavior: "smooth", block: "start"});
            $(sel.showMore).click();
        });

        it('endorse user skills', () => {
            const allSkills = $$(sel.plusIcon);
            allSkills.forEach(element => {
                element.scrollIntoView(false);
                element.moveTo();
                element.waitForDisplayed(5000);
                element.click(0);
                $(sel.endorseLevel).waitForDisplayed(5000);
                $(sel.endorseLevel).click();
                $(sel.submitButton).waitForEnabled(5000);
                $(sel.submitButton).click();
            });
        });
    });
});