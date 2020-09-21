import React from "react";
import auth from "../services/authService";
import moment from "moment";

function ProfilePage(props) {
  const user = auth.getCurrentUser();
  if (!user) window.location = "/";
  let keys = Object.keys(user);
  keys = keys.filter((key) => key !== "iat");

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
    </div>
  );
}

export default ProfilePage;
