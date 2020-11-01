import React, { useState, useEffect } from "react";
import auth from "../services/authService";
import moment from "moment";
import ImageSelector from "./ImageSelector";
import { updateUser } from "../services/userService";
function ProfilePage(props) {
  const [imageUrl, setImageUrl] = useState();

  let user = auth.getCurrentUser();
  if (!user) window.location = "/";
  let keys = Object.keys(user);
  keys = keys.filter((key) => key !== "iat");
  const images = {
    img1: "/img/dashboard/health1.png",
    img2: "/img/dashboard/health2.png",
    img3: "/img/dashboard/health3.png",
    img4: "/img/dashboard/motivation1.png",
    img5: "/img/dashboard/motivation2.png",
    img6: "/img/dashboard/motivation3.png",
    img7: "/img/dashboard/love1.png",
    img8: "/img/dashboard/love2.png",
    img9: "/img/dashboard/love3.png",
  };

  let handleImageSelected = (e) => {
    let images = document.getElementsByClassName("img-thumbnail");
    for (let image of images) {
      image.setAttribute("class", "image-fluid img-thumbnail");
      image.setAttribute("style", "border-width: 1px");
    }
    e.currentTarget.setAttribute(
      "class",
      "border border-primary image-fluid img-thumbnail"
    );
    e.currentTarget.setAttribute("style", "border-width: 3px");
    let slugIndex = e.currentTarget.src.split("/").length - 1;
    setImageUrl(e.currentTarget.src.split("/")[slugIndex]);
  };

  let handleSave = () => {
    user.imageUrl = imageUrl;
    updateUser(user);
    console.log("Save clicked!");
  };

  return (
    <div>
      <h1>User Token Properties</h1>
      {keys.map((property) => (
        <p key={property}>
          <b>{property}</b>: {user[property]}
        </p>
      ))}
      <p>
        <b>iat</b>: {moment.unix(user.iat).format("DD MMM YYYY hh:mm a")}
      </p>

      <ImageSelector
        images={images}
        handleClick={handleImageSelected}
        onSave={handleSave}
      />
    </div>
  );
}

export default ProfilePage;
