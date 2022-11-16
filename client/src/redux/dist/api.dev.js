"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTour = exports.googleSignIn = exports.signUp = exports.signIn = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: "http://localhost:5000"
});

var signIn = function signIn(formData) {
  return API.post("/users/signin", formData);
};

exports.signIn = signIn;

var signUp = function signUp(formData) {
  return API.post("/users/signup", formData);
};

exports.signUp = signUp;

var googleSignIn = function googleSignIn(result) {
  return API.post("/users/googleSignIn", result);
};

exports.googleSignIn = googleSignIn;

var createTour = function createTour(UploadTourData) {
  return API.post("/tour", UploadTourData);
}; // export const getTours = (page) => API.get(`/tour?page=${page}`);
// export const getTour = (id) => API.get(`/tour/${id}`);
// export const deleteTour = (id) => API.delete(`/tour/${id}`);
// export const updateTour = (updatedTourData, id) =>
//   API.patch(`/tour/${id}`, updatedTourData);
// export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
// export const getToursBySearch = (searchQuery) =>
//   API.get(`/tour/search?searchQuery=${searchQuery}`);
// export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);
// export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
// export const likeTour = (id) => API.patch(`/tour/like/${id}`);


exports.createTour = createTour;