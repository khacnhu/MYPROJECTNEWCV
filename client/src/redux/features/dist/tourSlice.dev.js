"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createTour = void 0;

var _toolkit = require("@reduxjs/toolkit");

var api = _interopRequireWildcard(require("../api"));

var _extraReducers;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const initialState = {
//     tour: null,
//     error: "",
//     loading: false
// }
var createTour = (0, _toolkit.createAsyncThunk)("tour/createTour", function _callee(_ref, _ref2) {
  var UploadTourData, navigate, toast, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          UploadTourData = _ref.UploadTourData, navigate = _ref.navigate, toast = _ref.toast;
          rejectWithValue = _ref2.rejectWithValue;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(api.createTour(UploadTourData));

        case 5:
          response = _context.sent;
          toast.success("Create Tour Successfully");
          navigate("/"); // console.log(response.data)///

          console.log(response.data);
          return _context.abrupt("return", response.data);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", rejectWithValue(_context.t0.response.data));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
exports.createTour = createTour;
var tourSlice = (0, _toolkit.createSlice)({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    error: "",
    loading: false
  },
  reducers: {},
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, createTour.pending, function (state, action) {
    state.loading = true;
  }), _defineProperty(_extraReducers, createTour.fulfilled, function (state, action) {
    state.loading = false;
    state.tours = [action.payload];
  }), _defineProperty(_extraReducers, createTour.rejected, function (state, action) {
    state.loading = false;
    state.error = action.payload;
  }), _extraReducers)
}); // export const { setCurrentPage } = tourSlice.actions;

var _default = tourSlice.reducer;
exports["default"] = _default;