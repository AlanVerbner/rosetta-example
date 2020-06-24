'use strict';

var utils = require('../utils/writer.js');
var AccountApi = require('../impl/AccountApiService');

module.exports.accountBalance = function accountBalance (req, res, next) {
  var body = req.swagger.params['body'].value;
  AccountApi.accountBalance(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
