import React from "react";

const Buttons = (props) => {
  return (
  
      <button
      className="vds-button vds-button--minimal vds-button--full vds-button-icon vds-button-icon--left"
      type="button"
    >
      <span className="vds-button">
        <i
          className="vds-icon"
          
        >
          <img src={props.buttonImage} width={24} height={24} />
        </i>{props.buttonText}
        
      </span>
    </button>
  
  );
};

export default Buttons;