'use strict';

var utils = require('../utils/writer.js');
var ConstructionApi = require('../impl/ConstructionApiService');

module.exports.constructionMetadata = function constructionMetadata (req, res, next) {
  var body = req.swagger.params['body'].value;
  ConstructionApi.constructionMetadata(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.constructionSubmit = function constructionSubmit (req, res, next) {
  var body = req.swagger.params['body'].value;
  ConstructionApi.constructionSubmit(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
