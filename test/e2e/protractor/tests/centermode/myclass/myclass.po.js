'use strict';
var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    Modals = require('../../modals/modals.po.js');

var header = new Header(),
    modals = new Modals(),
    vars = new Variables();
var MyClass = function () {

    this.createClassButton = $('[data-element="centerMode_button_newGroup"]');
    this.orderDropdown = $('[data-element="order_dropdown"]');
    this.orderDropdownName = $('[data-element="order_dropdown-0"]');
    this.orderDropdownLastFirst = $('[data-element="order_dropdown-1"]');
    this.orderDropdownOldFirst = $('[data-element="order_dropdown-2"]');
    this.classesList = element.all(by.xpath('//*[contains(@data-element,"class-list-name")]'));
    this.centersDropdown = $('[data-element="select_center"]');

    this.url = '#/center-mode/teacher';

    this.get = function () {
        browser.get(this.url);
    };
    this.getCenterInDropdownByName = function (centerName) {
        return element(by.xpath('//*[@data-element="select_center"]//button[text() = "' + centerName + '"]'));
    };

    this.createClass = function (options) {
        options = options || {};
        options.name = options.name || 'className_' + Date.now();

        header.navClass.click();
        if (options.centerName) {
            this.centersDropdown.click();
            this.getCenterInDropdownByName(options.centerName).click();

        }
        this.createClassButton.click();

        modals.inputModalChangeN.sendKeys(options.name);
        modals.okDialog.click();

        expect(modals.modalsText.isDisplayed()).toBe(true, 'The modal with the ID isn\'t displayed');

        return modals.modalsText.getText().then(function (classId) {
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            return {
                name: options.name,
                id: classId
            };
        });
    };

    this.getClassObject = function (classId) {
        return $('[data-element="class-' + classId + '"]');
    };

    this.getClassIdObject = function (classId) {
        return $('[data-element="classId-' + classId + '"]');
    };

    this.getArchivedClassObject = function (classId) {
        return element(by.xpath('//li[@data-element= "class-' + classId + '"]//div[@data-element= "archived-class"]'));
    };
};

module.exports = MyClass;