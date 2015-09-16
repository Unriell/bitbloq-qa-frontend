'use strict';


var Modals = function() {
    //P.O modal.html
    this.okDialog = $('[data-element="modal-ok-dialog"]');
    this.cancelDialog = $('[data-element="modal-cancel-dialog"]');
    this.bladeClose = $('[data-element="modal-blade-close"]');
    this.confirmOnly = $('[data-element="modal-confirm-only"]');
    //P.O modal-not-registered.html
    this.attentionContinueGuest = $('[data-element="atention-continue-guest"]');
    //P.O modal-change-language.html
    this.languagesDropdownButton = $('[data-element="languages-dropdown-button"]');
    //P.O modal-change-project-name.html
    this.inputModalChangeN = $('[data-element="modal-change-name-input"]');
    //P.O modal-send-comments.html
    this.sendCommentsName = $('[data-element="modal-send-comments-name"]');
    this.sendCommentsTextarea = $('[data-element="modal-send-comments-textarea"]');
    //P.O modal-notify-error.html
    this.notifyErrorTextArea = $('[data-element="modal-notify-error-textarea"]');
    this.notifyErrorSO = $('[data-element="modal-notify-error-so"]');
    this.notifyErrorBrowser = $('[data-element="modal-notify-error-browser"]');
    this.rejectTourPO = $('[data-element="reject-tour"]');
    this.rejectTour = function() {
        $('[data-element="reject-tour"]').click();
    };
    this.acceptTour = $('[data-element="accept-tour"]');
};

module.exports = Modals;
