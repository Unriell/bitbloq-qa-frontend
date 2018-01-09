/**
 *Spec to makeActionsFile.spec.js
 * Menu File of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
    GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    Login = require('../../../login/login.po.js'),
    Projects = require('../../../projects/projects.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    make = new Make(),
    modals = new Modals(),
    login = new Login(),
    projects = new Projects();

globalFunctions.xmlReport('bloqsprojectMakeActionsFile');

describe('Menu file of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-2928:bloqsprojectMakeActionsFile:Open new project', function() {

        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        makeActions.menuFile.click();
        makeActions.menuNewProject.click();

        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            expect(browser.getCurrentUrl()).toMatch(/#\/bloqsproject/);

            browser.close().then(function() {
                browser.switchTo().window(handles[0]);
            });

        });

    });

    it('SWBIT-2931:bloqsprojectMakeActionsFile: Copy a project', function() {
        var nameSavedProject = 'Test_Save_' + Number(new Date());
        login.loginWithRandomUser();
        projects.createNewProject();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            make.infoTab.click();
            make.projectName.click();
            modals.inputModalChangeN.clear();
            modals.inputModalChangeN.sendKeys(nameSavedProject);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitAutoSave);
            makeActions.menuFile.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.menuClone.click();
            browser.sleep(vars.timeToWaitMenu);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function(handles) {
                browser.switchTo().window(handles[2]);
                browser.sleep(vars.timeToWaitTab);
                expect(browser.getCurrentUrl()).toMatch(/#\/bloqsproject/);
                globalFunctions.navigatorLanguage()
                    .then(function(language) {
                        if (language === 'es') {
                            expect(make.projectName.getText()).toEqual('Copia de ' + nameSavedProject);
                        } else {
                            expect(make.projectName.getText()).toEqual('Copy of ' + nameSavedProject);
                        }
                    });

                browser.close().then(browser.switchTo().window(handles[1]));
            });
            expect(browser.getCurrentUrl()).toMatch(/#\/bloqsproject/);
            expect(make.projectName.getText()).toEqual(nameSavedProject);
            browser.close().then(browser.switchTo().window(handles[0]));
            projects.get();
            projects.getProjectCount().then(function(result) {
                expect(Number(result)).toEqual(2);
                login.logout();
            });
        });

    });

    //TODO: Fail on saucelabs
    // it('Download project', function(done) {

    //     login.loginWithRandomUser();
    //     make.get();
    //     //create new project
    //     make.infoTab.click();
    //     infotab.infotabProjectName.clear();
    //     var name = 'Test_Save';
    //     infotab.infotabProjectName.sendKeys(name);
    //     browser.sleep(vars.timeToWaitAutoSave);
    //     //modals.attentionContinueGuest.click();
    //     //browser.sleep(vars.timeToWaitFadeModals);

    //     var project = element(by.id('currentproject')).evaluate('project'),
    //         filePath = path.resolve() + '/test/e2e/protractor/res/downloads/Test_Save.json';

    //     project.then(function(value) {
    //         var projectObj = {
    //             'name': value.name,
    //             'description': value.description,
    //             'software': value.software,
    //             'hardware': value.hardware,
    //             'hardwareTags': value.hardwareTags,
    //             'userTags': value.userTags
    //         };
    //         delete projectObj.software.freeBloqs;
    //         makeActions.menuFile.click().then(function() {
    //             makeActions.menuDownload.click().then(function() {
    //                 //Wait to download file
    //                 browser.sleep(4000);
    //                 expect(JSON.parse(fs.readFileSync(filePath, 'utf8'))).toEqual(projectObj);
    //                 fs.unlink(filePath, done);
    //             });
    //         });
    //     });
    // });

});
