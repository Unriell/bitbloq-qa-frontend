/**
 *Spec to header.html
 */

'use strict';

var LoginBitbloq = require('../login/login.po.js'),
    Variables = require('../commons/variables.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    Register = require('../register/register.po.js'),
    Header = require('./header.po.js'),
    Make = require('../bloqsproject/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Projects = require('../projects/projects.po.js');

var login = new LoginBitbloq(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    register = new Register(),
    header = new Header(),
    make = new Make(),
    modals = new Modals(),
    projects = new Projects();

globalFunctions.xmlReport('header');

describe('Language', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    //globalFunctions.xmlReport('header');

    xit('SWBIT-3109:header:Test language change', function () {

        login.get();
        var randomUserCredentials = register.generateUser();
        register.createAccountButtn.click();
        register.createAccount(
            randomUserCredentials.username,
            randomUserCredentials.userEmail,
            randomUserCredentials.password,
            randomUserCredentials.day,
            randomUserCredentials.month,
            randomUserCredentials.year,
            true,
            true);
        //wait succesfull login page
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        header.openHeaderMenu.click();
        header.changeLanguage.click();
        modals.languagesDropdownButton.click();
        modals.languagesDropdownButton.all(by.css('li')).get(1).click();

        modals.okDialog.click();
        expect(header.menuLearn.getText()).toBe('Learn');
        login.logout();

        login.get();
        login.login({'user': randomUserCredentials.username, 'password': randomUserCredentials.password});
        expect(header.menuLearn.getText()).toBe('Learn');
        // browser.pause();
        login.logout();
    });

});

describe('Navbar --> ', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3110:header:Elements if no login --> Explora, aprende, foro, entrar', function () {

        //show always
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        header.navExplore.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/explore?page=1');
        browser.sleep(vars.timeToWaitTab + 1000);

        header.navLearn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/learn');

        header.navForum.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/forum');

        header.navLogo.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');

        //no show is no login
        expect(header.navProjects.isPresent()).toBe(false);
        projects.get();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');

    });

    it('SWBIT-3111:header:Elements with login user --> Mis proyectos, Explora, aprende, ayuda', function () {

        login.loginWithRandomUser();

        projects.get();
        expect(header.navProjects.isPresent()).toBe(true);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects?page=1');

        header.navExplore.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/explore?page=1');

        header.navLearn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/learn');

        header.navForum.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/forum');

        header.navLogo.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        login.logout();

    });
});
