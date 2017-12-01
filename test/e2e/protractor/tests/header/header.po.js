/**
 *Page object to header.html
 */

'use strict';

var Header = function () {
    this.openHeaderMenu = $('[data-element="open-header-menu"]');
    this.changeLanguage = $('[data-element="header-change-language"]');
    this.settings = $('[data-element="nav-settings"]');
    this.menuLearn = $('[data-element="header-menu-learn"]');
    this.enterButton = $('[data-element="header-enterbutton"]');
    this.centerModeBanner = $('[data-element="header-menu-create-center"]');
    //navbar
    this.navLogo = $('[data-element="nav-logo"]');
    this.navProjects = $('[data-element="nav-projects"]');
    this.navExplore = $('[data-element="nav-explore"]');
    this.navLearn = $('[data-element="nav-learn"]');
    this.navForum = $('[data-element="nav-forum"]');

    this.navShowMoreMenu = $('[data-element="nav-show-menu"]');

    //centermode
    this.navCenter = $('[data-element="nav-center"]');
    this.navClass = $('[data-element="nav-class"]');
    this.navExercise = $('[data-element="nav-exercises"]');
    this.navTasks = $('[data-element="nav-exercise"]');

};

module.exports = Header;
