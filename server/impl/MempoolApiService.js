'use strict';


/**
 * Get All Mempool Transactions
 * Get all Transaction Identifiers in the mempool
 *
 * body object 
 * returns Error
 **/
exports.mempool = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "transaction_identifiers": [
    {
      "hash": "0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f"
    }
  ]
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


/**
 * Get a Mempool Transaction
 * Get a transaction in the mempool by its Transaction Identifier. This is a separate request than fetching a block transaction (/block/transaction) because some blockchain nodes need to know that a transaction query is for something in the mempool instead of a transaction in a block.  Transactions may not be fully parsable until they are in a block (ex: may not be possible to determine the fee to pay before a transaction is executed). On this endpoint, it is ok that returned transactions are only estimates of what may actually be included in a block.
 *
 * body object 
 * returns Error
 **/
exports.mempoolTransaction = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "transaction": {
    "transaction_identifier": {
      "hash": "0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f"
    },
    "operations": [
      {
        "operation_identifier": {
          "index": 1,
          "network_index": 0
        },
        "related_operations": [
          {
            "index": 0,
            "operation_identifier": {
              "index": 0
            }
          }
        ],
        "type": "Transfer",
        "status": "Reverted",
        "account": {
          "address": "0x3a065000ab4183c6bf581dc1e55a605455fc6d61",
          "sub_account": {
            "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "metadata": {}
          },
          "metadata": {}
        },
        "amount": {
          "value": "1238089899992",
          "currency": {
            "symbol": "BTC",
            "decimals": 8,
            "metadata": {
              "Issuer": "Satoshi"
            }
          },
          "metadata": {}
        },
        "metadata": {
          "asm": "304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd01 03301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2",
          "hex": "48304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd012103301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2"
        }
      }
    ],
    "metadata": {
      "size": 12378,
      "lockTime": 1582272577
    }
  },
  "metadata": {
    "descendant_fees": 123923,
    "ancestor_count": 2
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

