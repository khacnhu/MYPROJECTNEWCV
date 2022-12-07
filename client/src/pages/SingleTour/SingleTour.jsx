import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour, getRelatedTours } from "../../redux/features/tourSlice";
import moment from "moment";
import "./singletour.css";
import { BiTime } from "react-icons/bi";
import RelatedTour from "../../components/RelatedTour/RelatedTour";
import Star from "../../components/Star/Star"

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  // console.log(tour)
  const { id } = useParams();
  // console.log(id)
  const tags = tour.tags;

  useEffect(() => {
    if (tags) {
      dispatch(getRelatedTours(tags));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);
  
  useEffect(() => {
    if (id) {
      window.scrollTo(0, 50)
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="singleTour">
        <div className="singleContain">
          <div className="singleImage">
            <div>
                <img src={tour.imageFile} alt={tour.title} />

            </div>
            <div className="informationTours" >DETAIL INFORMATION TOUR</div>
          </div>
          <div className="singleBody">
            <h3> {tour.title} </h3>
            <span>
              <p>Create by: {tour.name} </p>
            </span>
            <div className="singleTags">
              {tour &&
                tour.tags &&
                tour.tags.map((item, index) => (
                  <span key={index}> #{item} </span>
                ))}
            </div>
            <br></br>
            <div>
              <Star/>
            </div>
            <div className="singleTime">
              <small className="text-muted">
                <BiTime />
                {moment(tour.createdAt).fromNow()}
              </small>
            </div>
            <div className="singleDescription">{tour.description}</div>
          </div>
          <div className="hrLine" ></div>
          <RelatedTour relatedTours={relatedTours} tourId={id} />
        </div>
      </div>
    </>
  );
};

export default SingleTour;
