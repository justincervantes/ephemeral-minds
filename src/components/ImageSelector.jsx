import React from "react";

function ImageSelector({ images, handleClick, onSave, currentTarget }) {
  
  const saveButton = (      
    <div className="row p-2">
      <div className="col-sm-4 col-md-4 col-lg-4">      
        <button onClick={onSave} type="button" className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  )
  


  return (
    <div className="mb-3" style={{ width: "50%" }}>
      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img1.split('/')[images.img1.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img1}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img2.split('/')[images.img2.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img2}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img3.split('/')[images.img3.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img3}
          />
        </div>
      </div>

      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img4.split('/')[images.img4.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img4}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img5.split('/')[images.img5.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img5}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img6.split('/')[images.img6.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img6}
          />
        </div>
      </div>

      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img7.split('/')[images.img7.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img7}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img8.split('/')[images.img8.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img8}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            alt="Profile Dashboard Reminder"
            onClick={handleClick}
            className= {(currentTarget === images.img8.split('/')[images.img8.split('/').length - 1]) ? "border border-primary image-fluid img-thumbnail" : "img-fluid img-thumbnail"}
            src={images.img9}
          />
        </div>
      </div>
      {onSave ? saveButton : ""}
    </div>
  );
}

export default ImageSelector;
