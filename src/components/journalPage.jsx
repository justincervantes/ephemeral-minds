import React, { useEffect, useState } from "react";
import JournalTable from "./journalTable";
// import { TagCloud } from "react-tagcloud";
import { getUserEntries } from "../services/journalService";
import { getWeightHistory } from "../services/weightService"
import auth from "../services/authService";
import { Bar } from "react-chartjs-2";
import JournalAnalytics from "./journal/journalAnalytics";
function JournalPage(props) {
  const [words, setWords] = useState([]);
  const [scores, setScores] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);
  const [entries, setEntries] = useState([]);
  const [weights, setWeights] = useState([]);
  
  const MAX_WORDS = 100
  // Graph Data
  const data = {
    datasets: [
      {
        label: "Positivity Scale (-1 to 1)",
        type: "line",
        data: scores,
        fill: false,
        borderColor: "#EC932F",
        backgroundColor: "#EC932F",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        yAxisID: "y-axis-1",
      },
    ],
  };

  // Graph Options
  const graphOptions = {
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
            display: true,
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
          ticks: {
            suggestedMin: -1.0,
            suggestedMax: 1.0
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  // Graph Plugins
  const plugins = [{}];

  // Wordcloud Options
  // const wordCloudOptions = {
  //   colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  //   enableTooltip: true,
  //   deterministic: false,
  //   fontFamily: "impact",
  //   fontSizes: [10, 60],
  //   fontStyle: "normal",
  //   fontWeight: "normal",
  //   padding: 1,
  //   rotations: 3,
  //   rotationAngles: [0, 90],
  //   scale: "sqrt",
  //   spiral: "archimedean",
  //   transitionDuration: 1000,
  // };

  useEffect(() => {
    // Gets all the unique words across each journal entries content
    // Does not include titles
    function countWords(entries) {
      let wordFreq = [];
      // Iterating through all Journal data
      for (let i = 0; i < entries.length; i++) {
        let journalWordArray = entries[i].content
          .toLowerCase()
          //eslint-disable-next-line
          .replace(/[.,\/#!$?%\^&\*;:{}=\-_`~()]/g, "")
          .split(" ");

        // Iterating through each word in a single journal entry
        for (let j = 0; j < journalWordArray.length; j++) {
          let wordFound = false;
          // Comparing these words against all words in the word frequency array being created to count frequency.
          for (let k = 0; k < wordFreq.length; k++) {
            if (wordFreq[k].value === journalWordArray[j]) {
              wordFreq[k].count++;
              wordFound = true;
            }
          }
          if (!wordFound) {
            const articles = [
              
              "the",
       
                    "as",
    
                       "and",
 
                          "it",
           
                "of",
        
                   "a",
     
                      "an",

                           "i",
             
              "I",
         
                  "an",
       
                    "my",
    
                       "to",
            "at", "was","for", "have", "on", "that", "so", "in", "is", "but"
            ];
            if (articles.includes(journalWordArray[j])) continue;
            wordFreq.push({ value: journalWordArray[j], count: 1 });
          }
        }
      }

      wordFreq.sort(function (a, b) {
        return a.count - b.count;
      });

      if (wordFreq.length > MAX_WORDS) {
        wordFreq = wordFreq.splice(wordFreq.length - 100);
      }

      setWords(wordFreq);
    }

    function setGraphStates(entries) {
      // get a sorted array by date of all entries
      // console.log("Graph Entries", entries);
      entries.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      // console.log("Graph Entries Sorted", entries);
      // create 3 arrays from the sorted array

      const scoreArr = entries.map((obj) => obj.score);
      setScores(scoreArr);

      const datesArr = entries.map((obj) => obj.date);
      setDateLabels(datesArr);
      // set the states of score magnitude and date, then pass them to the graph
    }

    // Setting words, score, magnitude, and dates for the word cloud and graph
    async function setStates() {
      const uid = auth.getCurrentUser()._id;
      let { data } = await getUserEntries(uid);
      setEntries(data);
      let weights = await getWeightHistory();
      weights = weights.map((entry) => {
        entry.date = entry.date.split("T")[0];
        return entry;
      });
      setWeights(weights);
      data.map((entry) => (entry.date = entry.date.split("T")[0]));
      countWords(data);
      setGraphStates(data);
    }

    setStates();


  }, []);
  

  return (
    <>
      <div className="row">
      
        {/* ONLY DISPLAY ON LARGE DESKTOP SCREENS */}
        <div className="col-6 d-none d-lg-block" style={{ width: "100%", height: "100%" }}>
          <JournalAnalytics words={words} mostUsedWord={words[MAX_WORDS - 1]} scores={scores} entries={entries} weights={weights}/>
        </div>
        <div className="col-6 d-none d-lg-block">
          <Bar data={data} options={graphOptions} plugins={plugins} />
        </div>
        {/* END ONLY DISPLAY ON LARGE DESKTOP SCREENS */}
      
      </div>

      {entries.length === 0 ? (<h1>Write your first journal entry to get started...!</h1>) :      (<> <div className="col-12 d-lg-none">
          <Bar data={data} options={graphOptions} plugins={plugins} />
      </div>

      <div className="col-12 d-lg-none" style={{ width: "100%", height: "100%" }}>
          <JournalAnalytics words={words} mostUsedWord={words[MAX_WORDS - 1]} scores={scores} entries={entries} weights={weights} block/>
      </div></>)
}


      <div>
        <JournalTable />
      </div>
    </>
  );
}

export default JournalPage;
