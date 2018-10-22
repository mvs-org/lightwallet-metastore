//Set up database
var mongo = require('../libraries/mongo.js');

module.exports = {
    add: addWallet,
    get: getWallet
};

function addWallet(wallet) {
    return mongo.connect()
        .then(db => db.collection('multisig'))
        .then(col => col.insert(wallet))
        .then(() => wallet);
}

function getWallet(address) {
    return mongo.connect()
        .then(db => db.collection('multisig'))
        .then(col => col.findOne({a: address}, {_id: 0}));
}
