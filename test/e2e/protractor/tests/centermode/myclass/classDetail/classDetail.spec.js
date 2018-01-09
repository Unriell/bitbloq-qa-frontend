'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js'),
    Header = require('../../../header/header.po.js'),
    Commons = require('../../../commons/commons.po.js'),
    Myclass = require('../../myclass/myclass.po.js'),
    ClassDetail = require('./classDetail.po.js'),
    Login = require('../../../login/login.po.js'),
    Centermode = require('../../centermode.po.js'),
    Exercises = require('../../exercises/exercises.po.js'),
    MyExercises = require('../../myexercises/myexercises.po.js'),
    ExercisesTable = require('../../exercisesTable/exercisesTable.po.js'),
    TaskTable = require('../../taskTable/taskTable.po.js'),
    EditClassesModal = require('../../editClassesModal/editClassesModal.po.js'),
    Variables = require('../../../commons/variables.js'),
    Modals = require('../../../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    header = new Header(),
    commons = new Commons(),
    myclass = new Myclass(),
    classDetail = new ClassDetail(),
    login = new Login(),
    centermode = new Centermode(),
    exercises = new Exercises(),
    myExercises = new MyExercises(),
    exercisesTable = new ExercisesTable(),
    taskTable = new TaskTable(),
    editClassesModal = new EditClassesModal(),
    vars = new Variables(),
    modals = new Modals();

globalFunctions.xmlReport('classDetail');

describe('Class Detail', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3264:myclass:User can enter in a director open class', function() {
        var student = login.loginWithRandomUser();
        login.logout();

        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass().then(function(classInfo) {
            login.logout();
            login.login({
                user: student.user,
                password: student.password
            });
            exercises.registerInClass({
                idClass: classInfo.id
            });
            login.logout();
            login.login({
                user: headmaster.userEmail,
                password: headmaster.password
            });
            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            expect(classDetail.getStudentsObjectInStudentsTable(student.user).isDisplayed()).toBe(true, 'the student is not in the class list');
        });
    });

    it('SWBIT-3265:classDetail:User get an error entering in a director closed class', function() {

        centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass().then(function(classInfo) {
            myclass.getClassObject(classInfo.id).click();
            classDetail.closeClassButton.click();
            login.logout();

            login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id,
                dontCheckError: true
            });
            expect(modals.inputError.isDisplayed()).toBe(true, 'User must see an error entering to a closed class');
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            login.logout();
        });
    });

    it('SWBIT-3266:classDetail:Must be a list of student', function() {

        var headMaster = centermode.createHeadMaster({
            keepLogin: true
        });

        myclass.createClass().then(function(classInfo) {
            login.logout();

            var student1 = login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            login.logout();

            var student2 = login.loginWithRandomUser();
            exercises.registerInClass({
                idClass: classInfo.id
            });
            login.logout();

            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });
            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.studentsTab.click();
            expect(classDetail.getStudentsObjectInStudentsTable(student1.user).isDisplayed()).toBe(true, 'the student 1 is not in the class list');
            expect(classDetail.getStudentsObjectInStudentsTable(student2.user).isDisplayed()).toBe(true, 'the student 2 is not in the class list');

            login.logout();
        });
    });

    it('SWBIT-3267:classDetail:Must be a list of exercises', function() {

        centermode.createHeadMaster({
            keepLogin: true,
        });

        protractor.promise.all([
            myclass.createClass(),
            myExercises.createExercise(),
            myExercises.createExercise()
        ]).then(function(results) {
            var classInfo = results[0];
            var exerciseInfo1 = results[1];
            var exerciseInfo2 = results[2];

            protractor.promise.all([
                myExercises.addExerciseToClass({
                    classInfo: classInfo,
                    exerciseInfo: exerciseInfo1
                }),
                myExercises.addExerciseToClass({
                    classInfo: classInfo,
                    exerciseInfo: exerciseInfo2
                })
            ]);
            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.exercisesTab.click();
            expect(exercisesTable.getExerciseNameObject(exerciseInfo1.name).isDisplayed()).toBe(true, 'the exercise 1 is not in the class list');
            expect(exercisesTable.getExerciseNameObject(exerciseInfo2.name).isDisplayed()).toBe(true, 'the exercise 2 is not in the class list');
            login.logout();
        });
    });

    it('SWBIT-3268:classDetail:Verify that a Class can be archived', function() {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise()
        ]).then(function(results) {

            var classInfo = results[1],
                exerciseInfo1 = results[2];

            header.navExercise.click();
            exercisesTable.getExerciseOptionButton(exerciseInfo1.name).click();
            exercisesTable.getContextMenuOptionEditGroups(exerciseInfo1.name).click();
            expect(editClassesModal.getClassCheckbox(classInfo.name).isDisplayed()).toBe(true, 'The class should appear');
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.moreActionsButton.click();
            classDetail.archiveClassButton.click();
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);

            expect(commons.toastClassArchivedOK.isPresent(true, 'Class not archived'));
            header.navClass.click();
            expect(myclass.getArchivedClassObject(classInfo.id).isDisplayed()).toBe(true, 'Must appear an archived tag in the list');

            header.navExercise.click();
            exercisesTable.getExerciseOptionButton(exerciseInfo1.name).click();
            exercisesTable.getContextMenuOptionEditGroups(exerciseInfo1.name).click();
            expect(editClassesModal.getClassCheckbox(classInfo.name).isPresent()).toBe(false, 'The class shouldnt appear');
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);

            login.logout();
        });
    });

    it('SWBIT-3269:classDetail:Verify that is possible to cancel the process of archive a class', function() {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass()
        ]).then(function(results) {

            var classInfo = results[1];

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.moreActionsButton.click();
            classDetail.archiveClassButton.click();
            modals.cancelDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);

            expect(commons.toastClassArchivedOK.isPresent()).toBe(false, 'Class not archived');
            header.navClass.click();
            expect(myclass.getArchivedClassObject(classInfo.id).isPresent()).toBe(false, 'Cant appear an archived tag in the list');

            login.logout();
        });
    });

    it('SWBIT-3270:classDetail:Verify that a class can be deleted', function() {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            login.logout(),
            login.loginWithRandomUser()
        ]).then(function(results) {

            var headMaster = results[0],
                classInfo = results[1],
                student = results[3];

            exercises.registerInClass({
                idClass: classInfo.id
            });
            header.navTasks.click();
            expect(exercises.currentClassName.isDisplayed()).toBe(true, 'Should appear the class name in the tasks dashboard');
            login.logout();

            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.moreActionsButton.click();
            classDetail.deleteClassButton.click();
            modals.ok();
            header.navExercise.click(); //force refresh
            header.navClass.click();
            expect(myclass.getClassObject(classInfo.id).isPresent()).toBe(false, 'Class should be deleted');
            login.logout();
            login.login({
                user: student.user,
                password: student.password
            });
            header.navTasks.click();
            expect(exercises.currentClassName.isPresent()).toBe(false, 'Shouldnt appear the class name in the tasks dashboard');
        });
    });

    it('SWBIT-3271:classDetail:Verify that is possible to cancel the process of delete a class', function() {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            login.logout(),
            login.loginWithRandomUser()
        ]).then(function(results) {

            var headMaster = results[0],
                classInfo = results[1],
                student = results[3];

            exercises.registerInClass({
                idClass: classInfo.id
            });
            header.navTasks.click();
            expect(exercises.currentClassName.isDisplayed()).toBe(true, 'Should appear the class name in the tasks dashboard, just created');
            login.logout();

            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            classDetail.moreActionsButton.click();
            classDetail.deleteClassButton.click();
            modals.cancel();
            header.navExercise.click(); //force refresh
            header.navClass.click();
            expect(myclass.getClassObject(classInfo.id).isDisplayed()).toBe(true, 'Class should appear');
            login.logout();
            login.login({
                user: student.user,
                password: student.password
            });
            header.navTasks.click();
            expect(exercises.currentClassName.isDisplayed()).toBe(true, 'Should appear the class name in the tasks dashboard before cancel delete');
        });
    });

    it('SWBIT-3272:classDetail:delete task', function() {
        protractor.promise.all([
            centermode.createHeadMaster({
                keepLogin: true
            }),
            myclass.createClass(),
            myExercises.createExercise(),
            login.logout(),
            login.loginWithRandomUser()
        ]).then(function(results) {

            var headMaster = results[0],
                classInfo = results[1],
                exerciseInfo = results[2],
                student = results[4];

            exercises.registerInClass({
                idClass: classInfo.id
            });

            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            myExercises.addExerciseToClass({
                exerciseInfo: exerciseInfo,
                classInfo: classInfo
            });

            login.logout();
            login.login({
                user: student.user,
                password: student.password
            });

            header.navTasks.click();
            expect(taskTable.getTaskNameObject(exerciseInfo.name).isDisplayed()).toBe(true, 'Should appear the task');
            login.logout();
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });

            header.navClass.click();
            myclass.getClassObject(classInfo.id).click();
            exercisesTable.getExerciseOptionButton(exerciseInfo.name).click();
            exercisesTable.getContextMenuOptionRemoveFromThisClass(exerciseInfo.name).click();
            modals.ok();

            login.logout();
            login.login({
                user: student.user,
                password: student.password
            });

            header.navTasks.click();
            expect(taskTable.getTaskNameObject(exerciseInfo.name).isPresent()).toBe(false, 'the task should disappear');
        });
    });

    it('SWBIT-3274:myclass:User can enter in a profesor open class', function() {
        var headMaster = centermode.createHeadMaster();
        var student = login.loginWithRandomUser();
        login.logout();

        centermode.createTeacher({
            headMaster: headMaster,
            keepLogin: true
        }).then(function(teacher) {

            myclass.createClass().then(function(classInfo) {
                login.logout();
                login.login({
                    user: student.user,
                    password: student.password
                });
                exercises.registerInClass({
                    idClass: classInfo.id
                });
                login.logout();
                login.login({
                    user: teacher.userEmail,
                    password: teacher.password
                });
                header.navClass.click();
                myclass.getClassObject(classInfo.id).click();
                classDetail.studentsTab.click();
                expect(classDetail.getStudentsObjectInStudentsTable(student.user).isDisplayed()).toBe(true, 'the student is not in the class list');
                login.logout();
            });
        });
    });

});