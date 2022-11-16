import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";
import "./spinner.css"


const Spinner = () => {

    return (
        <>
        <MDBSpinner className = "spinner" >
            {/* <span>.....</span> */}

        </MDBSpinner>
        <div className = "titleLoading" >..............LOADING....................</div>
        </>
        
    )
}
export default Spinner