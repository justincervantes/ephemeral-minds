import React, { useEffect } from "react";
import JournalTable from "./journalTable";
import WeightBox from "./weightBox";

function HomePage({ user }) {
  useEffect(() => {});

  if (!user) return <h1>Please sign-up or log-in!</h1>;
  else
    return (
      <div className="row">
        <div className="col-8">
          <h1 className="my-2">Welcome to your dashboard, {user.name}!</h1>
          <JournalTable />
        </div>
        <div className="col-4 homepage-image-container">
          <img
            className="my-4 homepage-image"
            src="http://localhost:5050/img/1.jpg"
            alt="Motivational Quote"
          ></img>
          <WeightBox />
        </div>
      </div>
    );
}

export default HomePage;
