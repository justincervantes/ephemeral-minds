import React from "react";

function ImageSelector({ images, handleClick, onSave }) {
  return (
    <div className="mb-3" style={{ width: "50%" }}>
      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img1}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img2}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img3}
          />
        </div>
      </div>

      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img4}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img5}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img6}
          />
        </div>
      </div>

      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img7}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img8}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img
            onClick={handleClick}
            className="img-fluid img-thumbnail"
            src={images.img9}
          />
        </div>
      </div>
      <div className="row p-2">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <button onClick={onSave} type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageSelector;
