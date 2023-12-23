import React from "react";
import "./HelperPopup.css";

function HelperPopup(props) {
  return (
    <div className="HelperPopup">
      <div
        className="HelperPopup-main"
        style={{
          width: props.width,
          height: props.height,
          top: props.top,
          left: props.left,
        }}
      >
        <h6 className="message">{props.message}</h6>
        <div className="got-it-btn-div" onClick={()=>{props.gotIt()}} >Got It</div>
      </div>
    </div>
  );
}

export default HelperPopup;
