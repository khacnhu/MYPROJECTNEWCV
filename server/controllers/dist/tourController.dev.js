"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tour = require("../models/Tour");

var createTour = function createTour(req, res) {
  var tour, newTour;
  return regeneratorRuntime.async(function createTour$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tour = req.body;
          newTour = new Tour(_objectSpread({}, tour));
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(newTour.save());

        case 5:
          res.status(200).json(newTour);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          res.status(404).json({
            message: "Something went wrong"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
}; // getALL TOURS OR CAN YOU GET LIMIT TOURS


var getTours = function getTours(req, res) {
  var tours;
  return regeneratorRuntime.async(function getTours$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tour.find());

        case 3:
          tours = _context2.sent;
          res.status(200).json(tours);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Don't get Tours"
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  createTour: createTour,
  getTours: getTours
};