import React, { useState, useEffect } from "react";

interface imageProps {
  currentImg: string;
  onClose: any;
}

const ImageUpload: React.FC<imageProps> = ({ currentImg, onClose }) => {
  console.log(currentImg, "image component");
  return (
    <div
      className="mt-5"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div className="dialog" role="document">
        <div className="content">
          <div className="body ">
            <img src={currentImg} alt="imagex" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
