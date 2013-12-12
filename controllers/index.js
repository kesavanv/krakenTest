'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'wfm' };
        
        res.render('index', model);
        
    });

};
