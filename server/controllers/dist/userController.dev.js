"use strict";

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var User = require("../models/User");

var secret = "test";

var signup = function signup(req, res) {
  var _req$body, firstname, lastname, email, password, oldUser, salt, hashedPassword, result, accesToken;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          oldUser = _context.sent;

          if (!oldUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: "User already exist"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(12));

        case 9:
          salt = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 12:
          hashedPassword = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(User.create({
            email: email,
            password: hashedPassword,
            name: "".concat(firstname, " ").concat(lastname)
          }));

        case 15:
          result = _context.sent;
          accesToken = jwt.sign({
            email: result.email,
            id: result._id
          }, secret, {
            expiresIn: "1h"
          });
          res.status(201).send({
            result: result,
            accesToken: accesToken
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send({
            message: "Something went wrong"
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

var signin = function signin(req, res) {
  var _req$body2, email, password, oldUser, isCheckPassword, accessToken;

  return regeneratorRuntime.async(function signin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          oldUser = _context2.sent;

          if (oldUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).send({
            message: "User is not existed"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, oldUser.password));

        case 9:
          isCheckPassword = _context2.sent;

          if (!isCheckPassword) {
            res.status(400).send({
              message: "PASSWORD IS NOT CORRECT"
            });
          }

          accessToken = jwt.sign({
            email: oldUser.email,
            id: oldUser._id
          }, secret, {
            expiresIn: "1h"
          });
          res.status(200).send({
            result: oldUser,
            accessToken: accessToken
          });
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.status(500).send({
            message: "Something went wrong"
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

var googleSignIn = function googleSignIn(req, res) {
  var _req$body3, email, name, token, googleId, oldUser, _result, result;

  return regeneratorRuntime.async(function googleSignIn$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, name = _req$body3.name, token = _req$body3.token, googleId = _req$body3.googleId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          oldUser = _context3.sent;

          if (!oldUser) {
            _context3.next = 8;
            break;
          }

          _result = {
            _id: oldUser._id.toString(),
            email: email,
            name: name
          };
          return _context3.abrupt("return", res.status(200).json({
            result: _result,
            token: token
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(User.create({
            email: email,
            name: name,
            googleId: googleId
          }));

        case 10:
          result = _context3.sent;
          res.status(200).json({
            result: result,
            token: token
          });
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            message: "Something went wrong"
          });
          console.log(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

module.exports = {
  signup: signup,
  signin: signin,
  googleSignIn: googleSignIn
};