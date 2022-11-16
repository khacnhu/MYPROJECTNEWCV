import React, {useEffect} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from 'react-redux';
import { getTours } from '../../redux/features/tourSlice';
import "./Slick.css"

function Slick() {
  const { tours, currentPage, numberOfPages } = useSelector(
    (state) => ({ ...state.tour })
  );

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentPage) {
      dispatch(getTours(currentPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  };



  return (
    <div className = "slickSlider" >
      <h2 className = "slickSliderHeader" > Welcome to TKN Tour</h2>
      <Slider {...settings}>
      {
                tours.map(tour => (
                    <div key = {tour._id} className = "contentSlickTour" >
                        
                          <img src = {tour.imageFile} alt = "sanpham" className = "tourImage" />

                        
                        <p className = "tourName" > {tour.title} </p>
                    </div>
                ))

            }
      </Slider>
    </div>
  );
}

export default Slick