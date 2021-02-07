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
          backgroundImage: "url('/img/homepage/busy.jpg')",
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
              "Sometimes life is <u>hectic</u> ^1000",
              "You feel like you're just <u>along for the ride</u> ^1000",
              "Its time to <u>slow down</u>, <br/>so you can <u>speed up</u> ^2000",
              "`<b>Write Daily</b><br/><i>Start Today</i><br/><u>Make Change</u>`",
            ]}
          />
        </div>
      </div>
    );
  else
    return (
      <div className="row">
        <div className="col-8  d-none d-lg-block">
          <h1 className="my-2">Welcome to your dashboard, {user.name}!</h1>
          <JournalTable />
        </div>
        <div className="col homepage-image-container">
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
