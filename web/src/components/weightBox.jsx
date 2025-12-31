import React, { useEffect, useState } from "react";
import { getWeightHistory } from "../services/weightService";
import { Link } from "react-router-dom";
import WeightForm from "./weightForm";

function WeightBox(props) {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function getLatestLoggedWeight() {
      let weights = await getWeightHistory();
      weights = weights[weights.length - 1];
      let weight = weights ? weights.weight : 0;
      let date = weights ? weights.date : new Date().toISOString();
      date = date.split("T")[0];

      setWeight(weight);
      setDate(date);
    }
    getLatestLoggedWeight();
  }, []);

  return (
    <div className="card text-center mb-5">
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "25pt" }}>
          {weight === 0 ? "No weight history on record" : weight + " lbs"}
        </h5>
        <p className="card-text">
          {weight === 0 ? "" : `Last Weigh In: ${date}`}
        </p>
        <WeightForm />
        <Link to="/weight" className="btn btn-primary my-3">
          Weight Graphs
        </Link>
      </div>
    </div>
  );
}

export default WeightBox;
