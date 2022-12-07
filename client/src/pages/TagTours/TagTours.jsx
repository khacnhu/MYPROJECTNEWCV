import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import "./tagtour.css";
import {useSelector, useDispatch} from "react-redux"
// import { useNavigate } from "react-router-dom";
import { getToursByTag } from "../../redux/features/tourSlice";
import excerpt from "../../utils/excerpt";

const TagTours = () => {

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const {tag} = useParams()
  const {tagTours, loading} = useSelector((state)=>({...state.tour}))

  useEffect(() => {
    // setTimeout
    window.scrollTo(0, 20)
  }, [])

  useEffect(()=>{
    if(tag){
      dispatch(getToursByTag(tag))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])


  // if(loading) {
  //   return <div>..... LOADING .....</div>
  // }

  return (
    <div className="tagTour">
      <div className="listTours">
      <h1>TOURS BY TAG</h1>
        {
          tagTours && tagTours.map(item => (
            <div className="itemTour">
              <div className="tagImage">
                <img src={item.imageFile} alt= {item.title} className="imageTag" />
              </div>
              <div className="tagInfor">
                  <h2> {item.title} </h2>
                <div>
                  {excerpt(item.description)}
                </div>
                <Link to = {`/tour/${item._id}`} >Read More</Link>
              </div>
          </div>

          ))
        }
      </div>
    </div>
  );
};

export default TagTours;
