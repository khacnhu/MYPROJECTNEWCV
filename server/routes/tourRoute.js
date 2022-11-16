const express = require("express");
const router = express.Router();
const {
  createTour,
  getTours,
  getTour,
  getToursByUser,
  deleteTour,
  updateTour,
  getToursBySearch,
  getToursByTag,
  getRelatedTours,
  likeTour
} = require("../controllers/tourController");
const { auth } = require("../middlewares/auth");

router.get("/search", getToursBySearch);
router.patch("/like/:id", auth, likeTour)
router.get("/tag/:tag", getToursByTag);
router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.patch("/:id", auth, updateTour);
router.delete("/:id", auth, deleteTour);
router.get("/userTours/:id", auth, getToursByUser);
router.post("/relatedTours", getRelatedTours);

module.exports = router;
