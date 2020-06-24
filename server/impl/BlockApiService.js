'use strict';


/**
 * Get a Block
 * Get a block by its Block Identifier. If transactions are returned in the same call to the node as fetching the block, the response should include these transactions in the Block object. If not, an array of Transaction Identifiers should be returned so /block/transaction fetches can be done to get all transaction information.
 *
 * body object 
 * returns Error
 **/
exports.block = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "block": {
    "block_identifier": {
      "index": 1123941,
      "hash": "0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85"
    },
    "parent_block_identifier": {
      "index": 1123941,
      "hash": "0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85"
    },
    "timestamp": 1582833600000,
    "transactions": [
      {
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
      }
    ],
    "metadata": {
      "transactions_root": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "difficulty": "123891724987128947"
    }
  },
  "other_transactions": [
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
 * Get a Block Transaction
 * Get a transaction in a block by its Transaction Identifier. This endpoint should only be used when querying a node for a block does not return all transactions contained within it.  All transactions returned by this endpoint must be appended to any transactions returned by the /block method by consumers of this data. Fetching a transaction by hash is considered an Explorer Method (which is classified under the Future Work section).  Calling this endpoint requires reference to a BlockIdentifier because transaction parsing can change depending on which block contains the transaction. For example, in Bitcoin it is necessary to know which block contains a transaction to determine the destination of fee payments. Without specifying a block identifier, the node would have to infer which block to use (which could change during a re-org).  Implementations that require fetching previous transactions to populate the response (ex: Previous UTXOs in Bitcoin) may find it useful to run a cache within the Rosetta server in the /data directory (on a path that does not conflict with the node).
 *
 * body object 
 * returns Error
 **/
exports.blockTransaction = function(body) {
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

