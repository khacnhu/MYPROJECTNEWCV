"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setLogout = exports.setUser = exports.googleSignIn = exports.register = exports.login = void 0;

var _toolkit = require("@reduxjs/toolkit");

var api = _interopRequireWildcard(require("../api"));

var _extraReducers;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var login = (0, _toolkit.createAsyncThunk)("auth/login", function _callee(_ref, _ref2) {
  var formValue, navigate, toast, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          formValue = _ref.formValue, navigate = _ref.navigate, toast = _ref.toast;
          rejectWithValue = _ref2.rejectWithValue;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(api.signIn(formValue));

        case 5:
          response = _context.sent;
          toast.success("login Successfully");
          navigate("/"); // console.log(response.data)
          // console.log(response.data)

          return _context.abrupt("return", response.data);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", rejectWithValue(_context.t0.response.data));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.login = login;
var register = (0, _toolkit.createAsyncThunk)("auth/register", function _callee2(_ref3, _ref4) {
  var formValue, navigate, toast, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          formValue = _ref3.formValue, navigate = _ref3.navigate, toast = _ref3.toast;
          rejectWithValue = _ref4.rejectWithValue;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(api.signUp(formValue));

        case 5:
          response = _context2.sent;
          toast.success("Register Successfully");
          navigate("/login");
          console.log(response.data);
          return _context2.abrupt("return", response.data);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          rejectWithValue(_context2.t0.response.data);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
exports.register = register;
var googleSignIn = (0, _toolkit.createAsyncThunk)("auth/googleSignIn", function _callee3(_ref5, _ref6) {
  var result, navigate, toast, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = _ref5.result, navigate = _ref5.navigate, toast = _ref5.toast;
          rejectWithValue = _ref6.rejectWithValue;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(api.googleSignIn(result));

        case 5:
          response = _context3.sent;
          toast.success("Register Successfully");
          navigate("/");
          console.log(response.data);
          return _context3.abrupt("return", response.data);

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](2);
          rejectWithValue(_context3.t0.response.data);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
exports.googleSignIn = googleSignIn;
var authSlice = (0, _toolkit.createSlice)({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false
  },
  reducers: {
    setUser: function setUser(state, action) {
      state.user = action.payload;
    },
    setLogout: function setLogout(state, action) {
      localStorage.clear();
      state.user = null;
    }
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, login.pending, function (state, action) {
    state.loading = true;
  }), _defineProperty(_extraReducers, login.fulfilled, function (state, action) {
    state.loading = false;
    localStorage.setItem("profile", JSON.stringify(_objectSpread({}, action.payload)));
    state.user = action.payload;
  }), _defineProperty(_extraReducers, login.rejected, function (state, action) {
    state.loading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, googleSignIn.pending, function (state, action) {
    state.loading = true;
  }), _defineProperty(_extraReducers, googleSignIn.fulfilled, function (state, action) {
    state.loading = false;
    localStorage.setItem("profile", JSON.stringify(_objectSpread({}, action.payload)));
    state.user = action.payload;
  }), _defineProperty(_extraReducers, googleSignIn.rejected, function (state, action) {
    state.loading = false;
    state.error = action.payload;
  }), _defineProperty(_extraReducers, register.pending, function (state, action) {
    state.loading = true;
  }), _defineProperty(_extraReducers, register.fulfilled, function (state, action) {
    state.loading = false; // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

    state.user = action.payload;
  }), _defineProperty(_extraReducers, register.rejected, function (state, action) {
    state.loading = false;
    state.error = action.payload;
  }), _extraReducers)
});
var _authSlice$actions = authSlice.actions,
    setUser = _authSlice$actions.setUser,
    setLogout = _authSlice$actions.setLogout;
exports.setLogout = setLogout;
exports.setUser = setUser;
var _default = authSlice.reducer;
exports["default"] = _default;