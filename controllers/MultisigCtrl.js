let Wallet = require('../models/Wallet.js'),
    Message = require('../models/Message.js'),
    Helper = require('../libraries/helper.js'),
    Metaverse = require('metaversejs');

let service = {
    add: addWallet,
    get: getWallet
};

function addWallet(req, res) {
    let description = req.body.d;
    let pubkeys = req.body.k;
    let min = req.body.m;
    let number = req.body.n;


    Helper.checkError(pubkeys && (Array.isArray(pubkeys) && pubkeys.length > 1), 'Invalid public keys list')
        .then(() => Promise.all([
            Helper.checkError((min <= number), 'Minimum sign number is not allowed to be higher than the total number of keys'),
            Helper.checkError((min >= 1), 'Minimum sign number invalid'),
            Helper.checkError((number >= 1 && pubkeys.length == number), 'Number of keys invalid')
        ]))
        .then(() => Metaverse.multisig.generate(min, pubkeys))
        .then((multisig) => Wallet.add({
            d: description,
            k: pubkeys,
            m: min,
            n: number,
            a: multisig.address
        }))
        .then((wallet) => {
            res.status(200).json(Message.success(wallet, "NEW"));
        })
        .catch((error) => {
            switch (error.code) {
                case 11000:
                    res.status(200).json(Message.success(undefined, "DUPLICATE"));
                    break;
                default:
                    console.error(error);
                    res.status(400).json(Message.error(error.message));
            }
        });
}

function getWallet(req, res) {
    let address = req.params.address;
    Wallet.get(address)
        .then((wallet) => res.status(200).json(Message.success(wallet)))
        .catch((error) => {
            console.error(error);
            res.status(400).json(Message.error(error.message));
        });
}

module.exports = service;
