'use strict';

var Landing = function() {

    this.enterButton = $('[data-element="enter-button"]');
    this.feauturesButton = $('[data-element="landing-features-button"]');
    this.howItWorksButton = $('[data-element="landing-howitworks-button"]');
    this.aboutusButton = $('[data-element="landing-aboutus-button"]');
    this.helpButton = $('[data-element="landing-help-button"]');
    this.cookiesButton = $('[data-element="landing-cookies-button"]');
    this.termsButton = $('[data-element="landig-terms-button"]');
    this.landingPage = '$(\'[data-element="landing"]\')'; // This data-element is different (\'data-element\') because is use in executeScript


    //Help landing
    this.contactUsLink = $('[data-element="help-contact-us-link"]');
    this.byPhone = element(by.className('contact-by-phone'));

    //Button languages
    this.dropdownLanguage = $('[data-element="landing-language-dropdown"]');
    this.spanishLanguage = $('[data-element="landing-language-es-ES"]');
    this.englishLanguage = $('[data-element="landing-language-en-GB"]');
    this.nederlandsLanguage = $('[data-element="landing-language-nl-NL"]');
    this.russianLanguage = $('[data-element="landing-language-ru-RU"]');
    this.italianLanguage = $('[data-element="landing-language-it-IT"]');
    this.basqueLanguage = $('[data-element="landing-language-eu-ES"]');
    this.catalanLanguage = $('[data-element="landing-language-ca-ES"');
    this.frenchLanguage = $('[data-element="landing-language-fr-FR"]');
    this.germanLanguage = $('[data-element="landing-language-de-DE"]');
    this.portugueseLanguage = $('[data-element="landing-language-pt-PT"]');
    this.galicianLanguage = $('[data-element="landing-language-gl"]');
    this.chineseLanguage = $('[data-element="landing-language-zh-CN"]');

    //Download buttons
    this.downloadBtn = element(by.xpath('//div[@class="landing--masthead"]//button'));

    //Download links bottom page
    this.windowsBtn = element(by.xpath('//li/i[contains(@class, "windows")]/following-sibling::div/a'));
    this.linuxBtn = element(by.xpath('//li/i[contains(@class, "linux")]/following-sibling::div/a'));
    this.macsBtn = element(by.xpath('//li/i[contains(@class, "apple")]/following-sibling::div/a'));
    this.chromeBtn = element(by.xpath('//li/i[contains(@class, "chrome")]/following-sibling::div/a'));

    //Requirements
    this.requirements = element(by.className('landing--requirements'));

    this.get = function() {
        browser.get('#/');
    };
};

module.exports = Landing;
