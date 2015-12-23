'use strict';

/* A reference configuration file. */
/* For more options: https://github.com/angular/protractor/blob/master/docs/referenceConf.js */

var protractorConfig = require('./basic');

protractorConfig.config.suites.loginLocal = '../tests/login/login.spec.local.js';
protractorConfig.config.suites.makeactionsEditLocal = '../tests/bloqsproject/makeActions/edit/makeActionsEdit.spec.local.js';
protractorConfig.config.suites.makeactionsFileLocal = '../tests/bloqsproject/makeActions/file/makeActionsFile.spec.local.js';
protractorConfig.config.suites.filtersLocal = '../tests/explore/filters/filters.spec.local.js';
protractorConfig.config.suites.accountLocal = '../tests/account/account.spec.local.js';
protractorConfig.config.suites.infotabLocal = '../tests/bloqsproject/infotab/infotab.spec.local.js';
protractorConfig.config.suites.projectLocal = '../tests/explore/project.spec.local.js';
protractorConfig.config.suites.myProjectsLocal = '../tests/projects/myprojects/myprojects.spec.local.js';
protractorConfig.config.suites.stateLocal = '../tests/state/state.spec.local.js';
protractorConfig.config.suites.myProjectsLocal = '../tests/projects/myprojects/myprojects.spec.local.js';
protractorConfig.config.suites.makeactionsShareLocal = '../tests/bloqsproject/makeActions/share/makeActionsShare.spec.local.js';
protractorConfig.config.suites.autosaveLocal = '../tests/autosave/autosave.spec.local.js';

exports.config = protractorConfig.config;
