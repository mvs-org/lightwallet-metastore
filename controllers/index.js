/**
 *description router class
 */
let express = require('express'),
    router = express.Router(),
    config = require('../config/config.js'),
    MultisigCtrl = require('./MultisigCtrl.js');

router.post('/multisig', MultisigCtrl.add);
router.get('/multisig/:address', MultisigCtrl.get);

exports.routes = router;
