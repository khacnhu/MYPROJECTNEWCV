import React, {useEffect, useState} from "react";
import "./loadingtodirect.css"
import { useNavigate } from "react-router-dom";

const LoadingToDirect = () => {

    const [count , setCount] = useState(5)
    const navigate = useNavigate()

    useEffect(()=>{
        
        const interval = setInterval(() => {
            setCount((pre)=> pre - 1 )
        }, (1000));

        count === 0 && navigate("/login")
        
        return () => clearInterval(interval)

    }, [count, navigate] )


    return (
        <>
            LOADING 
        </>
    )
}

export default LoadingToDirect;