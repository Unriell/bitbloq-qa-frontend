/**
 *Spec to account.spec.js
 * User Account view
 */

'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Account = require('./account.po.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    vars =  new Variables(),
    account = new Account(),
    login = new Login(),
    modals = new Modals();

globalFunctions.xmlReport('account');

describe('User account view', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-157:Verify fields from new normal user', function() {

        var randomUserInfo = login.loginWithRandomUser();
        account.get();

        expect(account.username.getAttribute('value')).toBe(randomUserInfo.user.toLowerCase());
        expect(account.email.getAttribute('value')).toBe(randomUserInfo.userEmail.toLowerCase());
        expect(account.firstname.getAttribute('value')).toBe('');
        expect(account.lastname.getAttribute('value')).toBe('');

        login.logout();
    });

    xit('bba-24:Verify reset password (no social login)', function() {

        var randomUserInfo = login.loginWithRandomUser();
        account.get();
        account.resetPasswordButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.accountResetPasswordInput.sendKeys('123456');
        modals.accountResetPasswordRepitInput.sendKeys('123456');
        modals.accountResetPasswordOKButton.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();

        login.get();
        login.login(randomUserInfo.user,'123456');

        login.logout();
    });


});
