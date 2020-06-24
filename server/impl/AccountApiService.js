'use strict';


/**
 * Get an Account Balance
 * Get an array of all Account Balances for an Account Identifier and the Block Identifier at which the balance lookup was performed.  Some consumers of account balance data need to know at which block the balance was calculated to reconcile account balance changes.  To get all balances associated with an account, it may be necessary to perform multiple balance requests with unique Account Identifiers.  If the client supports it, passing nil AccountIdentifier metadata to the request should fetch all balances (if applicable).  It is also possible to perform a historical balance lookup (if the server supports it) by passing in an optional BlockIdentifier.
 *
 * body object 
 * returns Error
 **/
exports.accountBalance = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "block_identifier": {
    "index": 1123941,
    "hash": "0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85"
  },
  "balances": [
    {
      "value": "1238089899992",
      "currency": {
        "symbol": "BTC",
        "decimals": 8,
        "metadata": {
          "Issuer": "Satoshi"
        }
      },
      "metadata": {}
    }
  ],
  "metadata": {
    "sequence_number": 23
  }
};
    examples['application/json'] = {
  "code": 0,
  "message": "string",
  "retriable": true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

