'use strict';

var utils = require('../utils/writer.js');
var NetworkApi = require('../impl/NetworkApiService');

module.exports.networkList = function networkList (req, res, next) {
  var body = req.swagger.params['body'].value;
  NetworkApi.networkList(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.networkStatus = function networkStatus (req, res, next) {
  var body = req.swagger.params['body'].value;
  NetworkApi.networkStatus(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.networkOptions = function networkOptions (req, res, next) {
  var body = req.swagger.params['body'].value;
  NetworkApi.networkOptions(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
