import React from "react";
import excerpt from "../../utils/excerpt";
import "./relatedtour.css"
import {Link} from "react-router-dom"

const RelatedTour = ({ relatedTours, tourId }) => {
  console.log(relatedTours);
  console.log(tourId);
  return (
    <div className="listRelatedTours">
      <div
        className="relatedHeader"
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: "30px",
          color: "palevioletred",
        }}
      >
        RELATED TOURS
      </div>
      
      <div>
        {
            relatedTours && relatedTours.length > 1 && (
                <div className = "containTotal" >
                    {   
                        relatedTours.filter((item) => item._id !== tourId).splice(0,3).map((item) => (
                            <div className="footerTotal" >
                              <div className="footerImg" >
                                
                                <img src = {item.imageFile} alt = {item.title} />
                                <p className = "footerImgName" > {item.name} </p>
                                <p> {item.tags.map(ele=>(
                                  <span> #{ele} </span>
                                ))} </p>
                              </div> 
                              <div className="footerInformation" >
                                  <div className="footerInformationTitle" > {item.title} </div>
                                  <div> {excerpt(item.description)} </div>
                                  <Link to = {`/tour/${item._id}`} className="footerInforLink" >Read More</Link>
                              </div>

                            </div>
                              
                        ))
                    }
                </div>
            )
        }
      </div>
    </div>
  );
};

export default RelatedTour;
