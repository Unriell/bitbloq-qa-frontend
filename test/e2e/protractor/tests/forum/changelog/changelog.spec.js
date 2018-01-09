'use strict';

var Login = require('../../login/login.po.js'),
    Header = require('../../header/header.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Variables = require('../../commons/variables.js'),
    Forum = require('../forum.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js');

var login = new Login(),
    header = new Header(),
    make = new Make(),
    modals = new Modals(),
    vars = new Variables(),
    forum = new Forum(),
    globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('changelog');

describe('Changelog ', function() { //This pages has been deleted

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();


    it('SWBIT-3067:changelog:Verify that we can open changelog category (Registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.versionCategory.click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Versiones%20de%20Bitbloq/);
            login.logout();
        });
    });

    it('SWBIT-3068:changelog:Verify that we can open changelog category  (Unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.versionCategory.click();
        browser.getCurrentUrl().then(function(url) {
            expect(url).toMatch(/#\/forum\/Versiones%20de%20Bitbloq/);
        });
    });

    xit('SWBIT-3069:changelog:Verify that the last changelog post tell about the last version Bitbloq  (Registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.versionCategory.click();
        expect(forum.categoryTopicTitle.getText()).toMatch(vars.versionBitbloq);
    });

    xit('SWBIT-3070:changelog:Verify that the last changelog post tell about the last version Bitbloq  (Unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.versionCategory.click();
        expect(forum.categoryTopicTitle.getText()).toMatch(vars.versionBitbloq);
    });

    xit('SWBIT-3071:changelog:Verify that we can open the last changelog post  (Registered user)', function() {
        login.loginWithRandomUser();
        header.navForum.click();
        forum.versionCategory.click();
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
    });

    xit('SWBIT-3072:changelog:Verify that we can open the last changelog post (Unregistered user)', function() {
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitTab);
        header.navForum.click();
        forum.versionCategory.click();
        forum.categoryTopicTitle.click();
        expect(forum.isPresentTitle()).toBe(true);
        expect(forum.isPresentContentThread()).toBe(true);
    });
});
