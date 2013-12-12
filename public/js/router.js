/*global define:true, console:true, jQuery:true, require:true */
define([ 'nougat', 'jquery', 'backbone', 'BaseView', 'bootstrap', 'view/index'],
    function (nougat, $, Backbone, BaseView, Bootstrap, ContentView) {

        'use strict';

        var router, viewName, pageView;

        router = new (Backbone.Router.extend({
            routes: {
                'index':            'showView'
            },

            showView: function (name) {

                var viewName    = name || Backbone.history.fragment,
                    asyncAssets = [ 'view/' + viewName ];

                require(asyncAssets, function (view) {
                    console.log('router', view);
                    pageView.activate(view);
                });
            }

        }))();


        $(function () {
            var context = nougat.getContext();

            // Grab data from the page context
            nougat.setContext($(document.body).data());

            context = nougat.getContext();

            viewName = context.viewName;

            if (viewName !== 'index') {
                $(document.body).removeClass('loading');
                document.body.removeAttribute('data-view-name');
            }

            // build the Ajax'd content UI
            pageView = new ContentView();

            // Start watching the history
            // Note: Remove the existing hash if there is one
            if (window.location.hash) {
                window.location.hash = '';
            }

            // start recording history for backbone for Ajax'd content
            Backbone.history.start({
                pushState: true, // Use HTML5 Push State
                /* TODO: change hashChange back to true? */
                hashChange: false, // Do full page refresh if Push State isn't supported
                root: "/" //Initial path for app
            });
        });

    });