import React from "react";
import "./LoadingScreen.css";
import ScaleLoader from "react-spinners/ScaleLoader";

function LoadScreen(){
    return (
        <div>
            <div id = "load">
                <div id = "logo"></div>
                <div id = "load_text">
                    <ScaleLoader color={"#fff"} loading={true} size={120} />
                    <h1 className = "head">Almost Ready</h1>
                    <ScaleLoader color={"#fff"} loading={true} size={120} />
                </div>
            </div>
        </div> 
    )
}

export default LoadScreen;