import React, { useEffect, useState } from "react";
import JournalTable from "./journalTable";
import ReactWordcloud from "react-wordcloud";
import { getUserEntries } from "../services/journalService";
import auth from "../services/authService";
import _ from "lodash";
import { Bar } from "react-chartjs-2";

function JournalPage(props) {
  const [words, setWords] = useState([]);
  const [scores, setScores] = useState([]);
  const [magnitudes, setMagnitudes] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  const data = {
    datasets: [
      {
        label: "Sentiment (-1 to 1)",
        type: "line",
        data: scores,
        fill: false,
        borderColor: "#EC932F",
        backgroundColor: "#EC932F",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        yAxisID: "y-axis-2",
      },
      {
        type: "bar",
        label: "Magnitude",
        data: magnitudes,
        fill: false,
        backgroundColor: "#71B37C",
        borderColor: "#71B37C",
        hoverBackgroundColor: "#71B37C",
        hoverBorderColor: "#71B37C",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: "label",
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },

          labels: dateLabels,
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  const plugins = [
    {
      afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("This text drawn by a plugin", 100, 100);
      },
    },
  ];

  useEffect(() => {
    // Gets all the unique words across each journal entries content
    // Does not include titles
    function countWords(entries) {
      const wordFreq = [];
      // Iterating through all Journal data
      for (let i = 0; i < entries.length; i++) {
        let journalWordArray = entries[i].content
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
          .split(" ");

        // Iterating through each word in a single journal entry
        for (let j = 0; j < journalWordArray.length; j++) {
          let wordFound = false;
          // Comparing these words against all words in the word frequency array being created to count frequency.
          for (let k = 0; k < wordFreq.length; k++) {
            if (wordFreq[k].text === journalWordArray[j]) {
              wordFreq[k].value++;
              wordFound = true;
            }
          }
          if (!wordFound) {
            wordFreq.push({ text: journalWordArray[j], value: 1 });
          }
        }
        wordFreq.push();
      }
      setWords(wordFreq);
    }

    function setGraphStates(entries) {
      // get a sorted array by date of all entries
      console.log(entries);
      entries.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      console.log(entries);
      // create 3 arrays from the sorted array
      const scoreArr = entries.map((obj) => obj.score);
      setScores(scoreArr);

      const magnitudesArr = entries.map((obj) => obj.magnitude);
      setMagnitudes(magnitudesArr);

      const datesArr = entries.map((obj) => obj.date);
      setDateLabels(datesArr);
      // set the states of score magnitude and date, then pass them to the graph
    }

    // Setting words, score, magnitude, and dates for the word cloud and graph
    async function setStates() {
      const uid = auth.getCurrentUser()._id;
      let { data } = await getUserEntries(uid);
      data.map((entry) => (entry.date = entry.date.split("T")[0]));
      countWords(data);
      setGraphStates(data);
    }

    setStates();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <ReactWordcloud words={words} />
        </div>
        <div className="col-6">
          <Bar data={data} options={options} plugins={plugins} />
        </div>
      </div>
      <div>
        <JournalTable />
      </div>
    </>
  );
}

export default JournalPage;
