define([
    'nougat',
    'jquery',
    'backbone',
    'BaseView',
    'jqueryUI'
],
function (nougat, $, Backbone, BaseView, ui) {

    'use strict';

    var View = BaseView.extend({
        el: '#homePage',

        events: {
            'click .btn-success': 'handleClick',
            'hidden.bs.modal #myModal': 'changePage'
        },

        initialize: function () {
        },

        handleClick: function (e) {
            e.preventDefault();
            var regNum = $.trim($('#mobileNumber').val());
            if (regNum !== '') {
              $('.modal-title').html('Successfully registered ' + regNum);
            }
        },

        changePage: function (e) {
            window.location.replace("http://localhost:8000/sms");
        }
    });
    return View;
});

