import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import WeightForm from "./weightForm";
import { getWeightHistory } from "../services/weightService";

function WeightPage(props) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "My Weight",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });

  useEffect(() => {
    function getLabels(arr) {
      let result = arr.map((entry) => entry.date.split("T")[0]);
      return result;
    }

    function getData(arr) {
      let result = arr.map((entry) => entry.weight);
      return result;
    }

    async function getWeight() {
      let result = await getWeightHistory();
      // Sort the weights by date
      let weights = result.data.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });

      let labels = getLabels(weights);
      let weightData = getData(weights);

      let graph = {
        labels: labels,
        datasets: [
          {
            label: "My Weight",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: weightData,
          },
        ],
      };
      setData(graph);
    }
    getWeight();
  }, []);

  return (
    <div className="container">
      <WeightForm />
      <Line data={data} />
    </div>
  );
}

export default WeightPage;
