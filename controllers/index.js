'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'kraken',  viewName : 'index' };
        
        res.render('index', model);
        
    });

};
