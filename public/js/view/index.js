/* global window:true, document:true, define:true, require:true, console:true */
define([
    'jquery',
    'backbone',
    'BaseView'
],
  function ($, Backbone, BaseView, Dummy) {

    'use strict';

    var View = BaseView.extend({
        simpleRender: function () {
            var renderView = new BaseView();
            renderView.model = new Backbone.Model();
            renderView.template = 'subview';
            renderView.model.set(Dummy);
            renderView.afterRender = function (content) {
                $('#testView').html(content);
            };
            renderView._doRender = function(content, template) {
                // $(this.eDest).html(content);
            };
            renderView.render();
        },

        initialize: function () {
            console.log('client JS loaded');
            this.simpleRender();
        }
    });
    return View;
});