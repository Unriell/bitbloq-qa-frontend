'use strict';
var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login(),
    modals = new Modals();

globalFunctions.xmlReport('forum');

describe('Forum', function () {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-215:forum:check forum tag is present', function () {
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/#\/forum/);

        });

    });
    it('bbb-216:forum:check create a new topic button', function () {

        login.loginWithRandomUser();
        // from the main forum page
        forum.get();
        expect(forum.newTopicButton.isPresent()).toBe(true, 'fallo0');
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function (url) {
            console.log('url', url);
            expect(url).toMatch(/#\/forum\/new-theme/, 'fallo1');
            //from a category
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.newsCategory.click();
            expect(forum.newTopicButton.isPresent()).toBe(true, 'fallo4');
            forum.newTopicButton.click();
            browser.getCurrentUrl().then(function (url) {
                expect(url).toMatch(/#\/forum\/new-theme/, 'fallo2');
                //from a topic
                forum.get();

                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();

                forum.createNewTopic();

                browser.sleep(vars.timeToWaitLoadForumCategory);
                expect(forum.newTopicButton.isPresent()).toBe(false, 'fallo3');

            });
        });
    });

    it('bbb-225:forum:create a new topic (not registered)', function () {
        forum.get();
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/#\/login/);
            forum.get();
            browser.get('#/forum/new-theme/');
            browser.getCurrentUrl().then(function (url2) {
                expect(url2).toMatch(/#\/login/);
            });
        });
    });


    it('bbb-226:forum:create a new topic wrong', function () {
        login.loginWithRandomUser();

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());


        //topic no category
        forum.get();
        forum.newTopicButton.click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');


        //topic no title
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');


        //topic no description
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicTitle.sendKeys(titulo);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');

        //all is ok
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('false');

        login.logout();
    });

    it('bbb-194:forum: contact us (unregister user)', function () {
        forum.get();
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                expect(forum.contactUsLink.getAttribute('href')).toEqual(vars.supportEmail(language));
            });
    });

    it('bbb-191:forum: contact us (register user)', function () {

        login.loginWithRandomUser();
        forum.get();
        browser.executeScript('arguments[0].click()', forum.contactUsButton.getWebElement()).then(function () {
            expect(modals.okDialog.isEnabled()).toBe(false);
            modals.sendCommentsTextarea.sendKeys('Esto es un mensaje');
            browser.sleep(vars.timeToWaitSendKeys);
            expect(modals.okDialog.isEnabled()).toBe(true);
            modals.okDialog.click();
        });
    });

    it('bbb-217:forum:breadcrumbs functionalities', function () {

        login.loginWithRandomUser();
        forum.get();
        expect(forum.breadcrumbsForo.isPresent()).toBe(true, 'Forum breadcrumb fail 1');
        expect(forum.breadcrumbsForo.getCssValue('color')).toBe('rgba(55, 59, 68, 1)','Forum breadcrumb color fail 1');
        //categoria
        forum.newsCategory.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(true, 'Category breadcrumb fail 1');
        expect(forum.breadcrumbsForo.getCssValue('color')).toBe('rgba(55, 59, 68, 1)','Forum breadcrumb color fail 2');
        expect(forum.breadcrumbsCategory.getCssValue('color')).toBe('rgba(140, 145, 155, 1)','Category breadcrumb color fail 1');
        forum.breadcrumbsForo.click();
        forum.newsCategory.click();
        //tema
        forum.categoryTopicTitle.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(true, 'Topic breadcrumb fail 1');
        expect(forum.breadcrumbsForo.getCssValue('color')).toBe('rgba(55, 59, 68, 1)','Forum breadcrumb color fail 3');
        expect(forum.breadcrumbsCategory.getCssValue('color')).toBe('rgba(55, 59, 68, 1)','Category breadcrumb color fail 2');
        forum.breadcrumbsForo.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(false, 'Category breadcrumb is present');
        forum.newsCategory.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(true, 'Category breadcrumb fail 2');
        login.logout();

    });

    it('bbb-221:forum:verify check answer count for topic', function () {


        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        login.loginWithRandomUser();
        forum.get();
        forum.newTopicButton.click()
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(5).click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        forum.publishTopic.click();
        forum.createAnswer();
        expect(forum.firstAnswerTopic.getText()).toContain("1", 'Wrong answer number 1');
        forum.createAnswer();
        expect(forum.secondAnswerTopic.getText()).toContain("2", 'Wrong answer number 2');
        forum.breadcrumbsCategory.click();
        expect(element(by.xpath('//*[@data-element="forum-category-theme-title"][contains(text(), "'+titulo+'")]/../../../../../div[2]//span')).getText()).toContain("2", 'Wrong answer count');
        login.logout();

    })

    it('bbb-223:forum:check the last answer in a topic', function () {

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        var titulo2 = 'tema automatico2 ' + Number(new Date());
        var contenido2 = 'comentario automatico2 ' + Number(new Date());

        var user = login.loginWithRandomUser();
        forum.get();
        forum.newTopicButton.click()
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(5).click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        forum.publishTopic.click();

        protractor.promise.all([
            forum.createAnswer()
        ]).then(function (results) {
            var date = getFecha(new Date());
            browser.driver.navigate().refresh();
            expect(forum.answerUser.getText()).toBe(user.user.toLowerCase(), 'Usuario incorrecto en respuesta 1');
            expect(forum.answerUpdatedAt.getText()).toBe(date, 'Fecha incorrecta en respuesta 1');

            forum.breadcrumbsCategory.click();
            forum.newTopicButton.click();
            forum.categoryList.click();
            forum.categoryList.all(by.css('li')).get(5).click();
            forum.newTopicTitle.sendKeys(titulo2);
            forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido2);
            forum.publishTopic.click();
            protractor.promise.all([
                forum.createAnswer()
            ]).then(function (results) {
                date = getFecha(new Date());
                browser.driver.navigate().refresh();
                expect(forum.answerUser.getText()).toBe(user.user.toLowerCase(), 'Usuario incorrecto en respuesta 2');
                expect(forum.answerUpdatedAt.getText()).toBe(date, 'Fecha incorrecta en respuesta 2');
            });
        });
        login.logout();

        function getFecha(date){
            var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
              "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
            var fecha = date.getDate() +' '+ monthNames[date.getMonth()]+'. '+date.getFullYear()+', ';
            if(date.getHours()<10){
                fecha = fecha+ '0' + date.getHours();
            }else{
                fecha = fecha + date.getHours();
            }
            if(date.getMinutes() < 10){
                fecha = fecha + ':0' + date.getMinutes();
            }else{
                fecha = fecha + ':' + date.getMinutes();
            }
              return fecha;
        }


    })

    it('bbb-218:forum:check differeciated sections on the forum', function () {

        forum.get();
        //general background color:
        expect(forum.forumBackground.getCssValue('background-color')).toBe('rgba(238, 238, 238, 1)','Forum background is not grey');

        forum.sectionsArray.then(function(items){
            for(var seccion = 1; seccion<=items.length; seccion++) { //Iterates over the sections
                if(seccion!=1){ //Si no es la primera, no buscar titulo
                    expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")]['+seccion+']/div[contains(@class, "section__heading")]')).isPresent()).toBe(true, 'Title fail');
                }
                expect(items[seccion-1].getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)','Background color is not white');
                expect(items[seccion-1].getCssValue('margin-bottom')).toBe('30px','Section margin is not 30px');

                comprobarCategoriasDeSeccion(seccion);
            }

            /**
            * This function recives a section and iterate over the categories inside it.
            **/
            function comprobarCategoriasDeSeccion(seccion){
                element.all(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")]['+seccion+']/div[contains(@class, "row")]')).then(function(rows){
                    for(var categoria = 1; categoria<=rows.length; categoria++) { //Iterates over the categories
                        //console.log('Seccion: '+seccion+' || Categoria: '+categoria);
                        hasLastTopic(seccion, categoria);
                    }
                });
            }

            /**
            * This function recieves section and category and asserts his behaviour
            **/
            function hasLastTopic(seccion, categoria){
                  protractor.promise.all([
                             element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")]['+seccion+']/div[contains(@class, "row")]['+categoria+']//span[contains(@data-element, "forum-threads-counter")]')).getText(),
                              element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")]['+seccion+']/div[contains(@class, "row")]['+categoria+']/div[3]//span')).getText()
                 ]).then(function (results) {
                     if(results[0]==0 && results[1]==0){
                         expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")]['+seccion+']/div[contains(@class, "row")]['+categoria+']/div[4]//a')).isPresent()).toBe(false, 'Does have last topic');
                     }else{
                         expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")]['+seccion+']/div[contains(@class, "row")]['+categoria+']/div[4]//a')).isPresent()).toBe(true, 'Does not have last topic');
                     }
                 });
            }
        });
    })

    it('bbb-236:forum:check visit counter to a topic', function () {


        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        //create topic and visit topic (visit count does not increment)
        login.loginWithRandomUser();
        forum.get();
        forum.newTopicButton.click()
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(5).click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        forum.publishTopic.click();
        forum.breadcrumbsCategory.click();
        forum.categoryTopicTitle.click();
        forum.breadcrumbsCategory.click();
        expect(forum.firstTopicVisitCount.getText()).toContain("0", 'Wrong visits count 1');
        login.logout();

        //visit topic logged (increment visit count)
        login.loginWithRandomUser();
        forum.get();
        forum.othersCategory.click();
        forum.categoryTopicTitle.click();
        forum.breadcrumbsCategory.click();
        expect(forum.firstTopicVisitCount.getText()).toContain("1", 'Wrong visits count 2');
        login.logout();

        //visit topic with visitor (visit count does not increment)
        forum.get();
        forum.othersCategory.click();
        forum.categoryTopicTitle.click();
        forum.breadcrumbsCategory.click();
        expect(forum.firstTopicVisitCount.getText()).toContain("1", 'Wrong visits count 3');

    })


});
