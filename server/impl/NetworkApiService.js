"use strict";

/**
 * Get List of Available Networks
 * This endpoint returns a list of NetworkIdentifiers that the Rosetta server can handle.
 *
 * body object
 * returns Error
 **/
exports.networkList = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      network_identifiers: [
        {
          blockchain: "bitcoin",
          network: "mainnet",
          sub_network_identifier: {
            network: "shard 1",
            metadata: {
              producer: "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5",
            },
          },
        },
      ],
    };
    examples["application/json"] = {
      code: 0,
      message: "string",
      retriable: true,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get Network Status
 * This endpoint returns the current status of the network requested. Any NetworkIdentifier returned by /network/list should be accessible here.
 *
 * body object
 * returns Error
 **/
exports.networkStatus = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      current_block_identifier: {
        index: 1123941,
        hash:
          "0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85",
      },
      current_block_timestamp: 1582833600000,
      genesis_block_identifier: {
        index: 1123941,
        hash:
          "0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85",
      },
      peers: [
        {
          peer_id: "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5",
          metadata: {},
        },
      ],
    };
    examples["application/json"] = {
      code: 0,
      message: "string",
      retriable: true,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get Network Options
 * This endpoint returns the version information and allowed network-specific types for a NetworkIdentifier. Any NetworkIdentifier returned by /network/list should be accessible here.  Because options are retrievable in the context of a NetworkIdentifier, it is possible to define unique options for each network.
 *
 * body object
 * returns Error
 **/
exports.networkOptions = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      version: {
        rosetta_version: "1.2.5",
        node_version: "1.0.2",
        middleware_version: "0.2.7",
        metadata: {},
      },
      allow: {
        operation_statuses: [
          {
            status: "SUCCESS",
            successful: true,
          },
        ],
        operation_types: ["TRANSFER"],
        errors: [
          {
            code: 0,
            message: "string",
            retriable: true,
          },
        ],
      },
    };
    examples["application/json"] = {
      code: 0,
      message: "string",
      retriable: true,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
