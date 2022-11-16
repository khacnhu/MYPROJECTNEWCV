const Tour = require("../models/Tour");
const mongoose = require("mongoose");
// const { response } = require("express");

const createTour = async (req, res) => {
  const tour = req.body;
  const creator = req.userId;
  const newTour = new Tour({
    ...tour,
    creator: creator,
  });

  try {
    await newTour.save();
    res.status(200).send(newTour);
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" });
  }
};

// getALL TOURS OR CAN YOU GET LIMIT TOURS
const getTours = async (req, res) => {
  const {page} = req.query;

  try {
    const limit = 8
    const startIndex = Number((page-1))*limit
    const total = await Tour.countDocuments({})
    const tours = await Tour.find().limit(limit).skip(startIndex);
    res.status(200).json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,  
      numberOfPages: Math.ceil(total/limit)

    });
  } catch (error) {
    res.status(500).json({ message: "Don't get Tours" });
  }
};

const getTour = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    const tour = await Tour.findById(id);
    return res.status(200).json(tour);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server fall PLEASE check Server" });
  }
};

const getToursByUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "USER IS NOT EXISTED" });
  }
  try {
    const userTours = await Tour.find({ creator: id });
    return res.status(200).json(userTours);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server is failed" });
  }
};

const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "NOT FOUND TOUR TO DELETE" });
    }

    await Tour.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    return res.status(404).json({ message: "SERVER FAILURE" });
  }
};

const updateTour = async (req, res) => {
    const { id } = req.params;
  console.log("update ID", +id);
  const { title, description, creator, imageFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Tour is not Found or not existed" });
    }

    const updatedTour = {
      title,
      creator,
      description,
      imageFile,
      tags,
      _id: id,
    };

    await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    return res.status(200).json(updatedTour);
  } catch (error) {
    console.log(error);
  }


  
  
};

const getToursBySearch = async (req, res) => {
  const {searchQuery} = req.query 
  try {
     const title = new RegExp(searchQuery, "i")
     console.log(title)
     const tours = await Tour.find({title})
     return res.status(200).json(tours)
  } catch (error) {
    return res.status(404).json("KEY WORD IS NOT FOUND")
  }


}


const getToursByTag = async (req, res) => {
  const {tag} = req.params
  // console.log("TAG...", tag)

  try {
    const tours = await Tour.find({ tags: { $in: tag } })
    // console.log(tours)
    return res.status(200).json(tours)

  } catch (error) {
    return res.status(404).json({message: "TAGS ARE NOT FOUND"})
  }

}


const getRelatedTours = async (req, res) => {
  const tags = req.body;
  try {
    const tours = await Tour.find({ tags: { $in: tags } });
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(404).json({message: "TOURS ARE NOT FOUND"})
  }

}


const likeTour = async(req, res) => {
  const {id} = req.params
  console.log("ID IN LIKETOUR", id)

  try {
    if (!req.userId){
      return res.status(403).json({message: "USER IS NOT FOUND AND UNTHORIZATION"})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message: "NO TOUR IS NOT EXIST WITH ID"})
    }

    const tour = await Tour.findById(id)

    const index = tour.likeCount.findIndex((id) => id === String(req.userId))

    
    if(index === -1) {
      tour.likeCount.push(req.userId)
    } else {
      tour.likeCount = tour.likeCount.filter((id) => id !== String(req.userId))
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, tour, {new: true})

    res.status(200).json(updatedTour)



  } catch (error) {
    console.log(error.message)

    return res.status(500).json({message:"Server Failure"})
    
  }
  
}


module.exports = {
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
};
