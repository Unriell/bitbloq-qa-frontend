/**
 *Spec to  para la tab de projects, es decir, para la pestaña de mis proyectos
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    MyProjects = require('./myprojects.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Projects = require('../projects.po.js'),
    path = require('path'),
    fs = require('fs');

var vars = new Variables(),
    myprojects = new MyProjects(),
    make = new Make(),
    modals = new Modals(),
    globalFunctions = new GlobalFunctions(),
    login = new Login(),
    projects = new Projects();

globalFunctions.xmlReport('myProjectsLocal');

describe('My projects, only local', function() {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bba-149:Verify copy a project', function() {
        var nameProject = 'test';
        make.saveProjectNewUser(nameProject);
        projects.get();
        browser.sleep(vars.timeToWaitTab);
        var file1 = path.resolve() + '/target/' + nameProject + '.ino';
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);
        myprojects.downloadIno.click();
        browser.driver.wait(function() {
            return fs.existsSync(file1);
        }, 4000).then(function() {
            myprojects.overMyProjects.click();
            browser.sleep(vars.timeToWaitFadeModals);
            myprojects.copyProject.click();
            browser.sleep(vars.timeToWaitFadeModals);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitAutoSave).then(function() {
                expect(myprojects.projectName.getText()).toEqual('Copia de ' + nameProject);
                var file2 = path.resolve() + '/target/' + 'Copia_de_' + nameProject + '.ino';
                myprojects.overMyProjects.click();
                browser.sleep(vars.timeToWaitFadeModals);
                myprojects.downloadIno.click();
                browser.driver.wait(function() {
                    return fs.existsSync(file2);

                }, 4000).then(function() {
                    expect(fs.readFileSync(file1, 'utf8')).toEqual(fs.readFileSync(file2, 'utf8'));
                    login.logout();
                });
            });
        });
    });

    xit('bba-28:Verify strange characters in project name do not appear in code export', function() {
        var fileToUpload = path.resolve() + '/test/e2e/protractor/res/CreandoUnVoltimetroBitbloq.json';
        fileToUpload = globalFunctions.filePath(fileToUpload);
        var fileToCompare = path.resolve() + '/test/e2e/protractor/res/CreandoUnVoltimetroBitbloq.ino';
        fileToCompare = globalFunctions.filePath(fileToCompare);
        var fileDownload = path.resolve() + '/target/asdf.ino';
        fileDownload = globalFunctions.filePath(fileDownload);
        make.importFileNewUser(fileToUpload);
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('asdf!"·$%&');
        browser.sleep(vars.timeToWaitSendKeys);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);
        projects.get();
        browser.sleep(vars.timeToWaitTab);
        myprojects.overMyProjects.click();
        browser.sleep(vars.timeToWaitFadeModals);
        myprojects.downloadIno.click();
        browser.wait(function() {
            return fs.existsSync(fileDownload);
        }, 4000).then(function() {
            expect(fs.readFileSync(fileDownload, 'utf8')).toEqual(fs.readFileSync(fileToCompare, 'utf8'));
            expect(path.basename(fileDownload)).toEqual('asdf.ino');
            login.logout();

        });

    });

});