/**
 * Page objects of account.html
 */
'use strict';

var Account = function () {

    this.url = ('#/account');
    this.userTab = $('[data-element="account-user-tab"]');
    this.settingsTab = $('[data-element="account-settings-tab"]');
    this.firstname = $('[data-element="firstname"]');
    this.lastname = $('[data-element="lastname"]');
    this.username = $('[data-element="username"]');
    this.email = $('[data-element="email"]');
    this.resetPasswordButton = $('[data-element="account-reset-password-button"]');
    this.fileinput = $('[data-element="account-fileinput"]');
    this.accountImage = $('[data-element="account-image"]');
    //checkbox
    this.imATeacher = $('[data-element="teacher-checkbox"]');
    this.useChromeAppCheckbox = $('[data-element="chromeapp-checkbox"]');


    this.get = function () {
        browser.get(this.url);
    };

};

module.exports = Account;
