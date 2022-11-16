import React from "react";
import "./cardtours.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import excerpt from "../../utils/excerpt";
import { BiLike } from "react-icons/bi";
import { likeTour } from "../../redux/features/tourSlice";
import { MDBTooltip } from "mdb-react-ui-kit";
import { AiTwotoneLike } from "react-icons/ai";


const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likeCount,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;
  
  const dispatch = useDispatch();
  
  
  const Like = () => {
    if (likeCount.length > 0) {
      return likeCount.find((like) => like === userId) ? (
        <>
          <button onClick={handleLike}>
            <AiTwotoneLike />
            {likeCount.length > 2 ? (
              <>
                <MDBTooltip
                  tag="a"
                  title={`You and ${likeCount.length - 2} other people likes`}
                >
                  {likeCount.length - 1 } likes
                </MDBTooltip>
              </>
            ) : (
              `${likeCount.length - 1 } Like${likeCount.length > 2 ? "s" : ""}`
              )}

          </button>
        </>
      ) : (
        <>
          <button onClick={handleLike}>
            <BiLike />
            <span className="likeText">
              {" "}
              {likeCount.length - 1} {likeCount.length === 2 ? "Like" : "Likes"}{" "}
            </span>
          </button>
        </>
      );
    }
    return (
      <button  onClick={handleLike} >
        <BiLike  />
        <span className="likeText">Like</span>
      </button>
    );
  };
  
  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };


  return (
    <div className="cardTour">
      <div className="cardHeader">
        <img src={imageFile} alt={title} />
        <div className="cardName"> {name} </div>

        <span>
          {" "}
          {tags.map((item, index) => (
            <Link
              to={`/tours/tag/${item}`}
              key={index}
              style={{
                color: "palevioletred",
                fontWeight: "700",
                marginRight: "4px",
              }}
            >
              #{item}
            </Link>
          ))}
        </span>
      </div>
      <div className="likeButton">
        <Like />
      </div>
      <div className="cardBody">
        <div className="cardTitle"> {title} </div>
        <div> {excerpt(description)}</div>
        <Link to={`/tour/${_id}`}>Read More</Link>
      </div>
    </div>
  );
};

export default CardTour;
