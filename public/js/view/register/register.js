define(['jquery', 'backbone', 'BaseView', 'jqueryUI'],
function ($, Backbone, BaseView, ui){

  'use strict';

  var View = Backbone.View.extend({
    el: '#registerForm',
    events: {
    	'click .save': 'formValidation',
    },
    initialize: function(){

    },
    formValidation : function(e) {
    	e.preventDefault();
    	var mn= $('#mobileNumber').val();
    	console.log(mn);
    }
  })

  return new View;;
});

