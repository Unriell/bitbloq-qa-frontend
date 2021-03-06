/**
 * Spec to explore.html
 */

'use strict';
/* jshint loopfunc: true */

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Explore = require('../explore/explore.po.js');

var globalFunctions = new GlobalFunctions(),
    explore = new Explore();

globalFunctions.xmlReport('exploreXit');

describe('Explore tab', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bbb-184:exploreXit:Show project using scroll', function() { //No aplica porque ya no hay scroll infinito

        explore.get();
        //This sleep is necessary because the next statamente (executeScript) not syncronize with angularjs
        browser.sleep(2000);
        //First test if there are projects and saved value for nest test
        var firstvalue, lastvalue;
        var script = explore.indexMain + '.scrollTo(0,1000);';
        browser.executeScript(script).then(function() {
            explore.exploreCounts.getText().then(function(value) {
                console.log('\n');
                value = value.split('/');
                console.log('Scroll 1000');
                //saved the value for next check
                firstvalue = value[0];
                lastvalue = value[1];
                if (value[0] !== value[1]) {
                    console.log('First test if !== value[0]: ' + value[0] + ' !== value[1]: ' + value[1] + ' are project and no final scroll then expect value[0]: ' + value[0] + ' less than value[1]: ' + value[1]);
                    //first expect, in explore numbers of projects (X/Y) X less than Y
                    console.log('First value test in scroll' + value);
                    console.log('Expect X:' + value[0] + ' less than Y:' + value[1]);
                    expect(Number(value[0])).toBeLessThan(Number(value[1]));
                    //expect(18).toBeLessThan(116);
                } else {
                    console.log('value[0]: ' + value[0] + ' === value[1]: ' + value[1] + ' there are not project');
                }
                console.log('\n');
            });
        }).then(
            function() {
                //Second and next test check last value is different next values
                var i;
                for (i = 1; i < 5; i += 1) {
                    script = explore.indexMain + '.scrollTo(0,' + 8500 + ');';
                    browser.executeScript(script).then(function() {
                        explore.exploreCounts.getText().then(function(value) {
                            value = value.split('/');
                            console.log('Scroll :' + i);
                            if (firstvalue !== value[0]) {
                                console.log('next test if firstvalue: ' + firstvalue + ' !== value[0]: ' + value[0] + ' is no final scroll then expect firstvalue: ' + firstvalue + ' less than new value[0]: ' + value[0]);
                                //Second expect, in explore numbers of projects (X/Y) X less than Y
                                console.log('Second value test in scroll' + value);
                                console.log('Expect X last :' + firstvalue + ' less than X new:' + value[0]);
                                expect(Number(firstvalue)).toBeLessThan(Number(value[0]));
                                //saved the value for next check
                                firstvalue = value[0];
                            } else {
                                //If is the final of scroll firstvalue is equal lastvalue, if no expect no work scroll or change data-elemen reference scroll
                                expect(Number(firstvalue)).toEqual(Number(lastvalue));
                                console.log('next test if firstvalue: ' + firstvalue + ' === value[0]: ' + value[0] + ' is final scroll and there is not expect');
                            }
                            console.log('\n');
                        });
                    });
                }

            });

    });
});
