import React, { useEffect, useState } from "react";
import JournalTable from "./journalTable";
import WeightBox from "./weightBox";
import Typewriter from "./typewriter";
function HomePage({ user }) {
  const [height, setHeight] = useState();
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    setHeight(window.innerHeight - 56);
  }, []);

  function updateWindowDimensions() {
    setHeight(window.innerHeight - 56);
  }
  
  if (!user)
    return (
      <div
        className="row justify-content-center"
        style={{
          backgroundImage: "url('/img/homepage/2020.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          height: `${height}px`,
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="my-auto text-center">
          <Typewriter
            strings={[
              "Ephemeral Mind is your <u>journal</u>",
              "Ephemeral Mind is your ^1000 <u>weight loss logger</u>",
              "Ephemeral Mind is your ^1000 <u>food tracker</u>",
              "Ephemeral Mind improves <u>MIND</u>, <b>BODY</b> and <i>SOUL</i>",
            ]}
          />
        </div>
      </div>
    );
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
            src={"img/dashboard/" + user.imageUrl}
            alt="Motivational Quote"
            style={{ width: "100%" }}
          ></img>
          <WeightBox />
        </div>
      </div>
    );
}

export default HomePage;
