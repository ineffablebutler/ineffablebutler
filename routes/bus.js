var express = require('express');
var app = express();
var busRouter = express.Router();
var request = require('request');
var RouteDB = require('../models/routeCodes.js');
var cleanStopName = function (stopName) {
  var i;
  var cleaned = stopName.split('');
  for (i = 0; i < cleaned.length; i++) {
    if (stopName[i] === "'") {
      cleaned.splice(i, 1);
    } else if (stopName[i] === "&") {
      cleaned.splice(i, 1, 'and');
    }
  }
  cleaned = cleaned.join('');
  return cleaned;
};
var getXMLFrom511 = function (direction, stopName, stopCode, callback) {
  var APItoken = 'e04385aa-cdb9-4f5b-9d78-9c7e0dcb7260';
  var endpoint = 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=' + APItoken + '&stopCode=' + stopCode;
  var xml;
  request(endpoint, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode === 200) {
      xml = body;
      callback(xml);
    }
  });
};

busRouter.get('/', function (req, res) {
  var busNumber = req.query.busNumber;
  var direction = req.query.direction;
  var stopName = cleanStopName(req.query.stopName);
  RouteDB.find({
    "routeName": busNumber,
    "routeDir": direction,
    "routeStop.name": stopName
  }, {
    "routeStop": {
      $elemMatch: {
        "name": stopName
      }
    }
  }).exec(function (err, stopCode) {
    if (err) {
      throw new Error("error: " + err);
    } 

    if (stopCode.length > 0) {
      stopCode = stopCode[0]["routeStop"][0]["StopCode"];

      getXMLFrom511(direction, stopName, stopCode, function (xml) {
        res.status(200).send({
          xml: xml,
          busNumber: busNumber,
          direction: direction,
          stopName: stopName
        });
      });
    } else {
      res.status(204).send({ err: "StopCode not available." });
    }

  });
});
module.exports = busRouter;