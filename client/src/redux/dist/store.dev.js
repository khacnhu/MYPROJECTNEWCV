"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authSlice = _interopRequireDefault(require("./features/authSlice"));

var _tourSlice = _interopRequireDefault(require("./features/tourSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _toolkit.configureStore)({
  reducer: {
    auth: _authSlice["default"],
    tour: _tourSlice["default"]
  }
});

exports["default"] = _default;