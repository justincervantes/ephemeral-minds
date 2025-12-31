import React, { useState } from "react";
import moment from "moment";
import ImageSelector from "./ImageSelector";
import { updateUser } from "../services/userService";

function ProfilePage(props) {
  const [imageUrl, setImageUrl] = useState();
  const {user} = props;
  console.log(user);

  // TODO: Refactor this into an exported object
  let images = {
    img1: "/img/dashboard/health1.jpg",
    img2: "/img/dashboard/health2.jpg",
    img3: "/img/dashboard/health3.jpg",
    img4: "/img/dashboard/motivation1.jpg",
    img5: "/img/dashboard/motivation2.jpg",
    img6: "/img/dashboard/motivation3.jpg",
    img7: "/img/dashboard/love1.jpg",
    img8: "/img/dashboard/love2.jpg",
    img9: "/img/dashboard/love3.jpg",
  };

  if (!user) window.location = "/";
  let keys = Object.keys(user);
  keys = keys.filter((key) => key !== "iat");


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

  // TODO: Add validation or error message if the update method fails
  // TODO: Add environment variables for testing
  let handleSave = async () => {
    await updateUser(imageUrl);
    if(window.location.hostname === 'localhost') {
      window.location.href = "http://localhost:3000/";
    } else {
      window.location.href = "https://ephemeralmind.ca";
    }
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
        currentTarget={user.imageUrl}
        images={images}
        handleClick={handleImageSelected}
        onSave={handleSave}
      />
    </div>
  );
}

export default ProfilePage;
