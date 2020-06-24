'use strict';

var utils = require('../utils/writer.js');
var BlockApi = require('../impl/BlockApiService');

module.exports.block = function block (req, res, next) {
  var body = req.swagger.params['body'].value;
  BlockApi.block(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.blockTransaction = function blockTransaction (req, res, next) {
  var body = req.swagger.params['body'].value;
  BlockApi.blockTransaction(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
