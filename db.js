var Mongolian = require('mongolian'),
	dbServer = new Mongolian(),
	db = dbServer.db('test'); //db name

module.exports.collections = {
	result: db.collection('mycol')
};


