'use strict';

var utils = require('../utils/writer.js');
var MempoolApi = require('../impl/MempoolApiService');

module.exports.mempool = function mempool (req, res, next) {
  var body = req.swagger.params['body'].value;
  MempoolApi.mempool(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mempoolTransaction = function mempoolTransaction (req, res, next) {
  var body = req.swagger.params['body'].value;
  MempoolApi.mempoolTransaction(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
