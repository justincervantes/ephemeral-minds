import React, { useEffect, useState } from "react";
import JournalTable from "./journalTable";
import ReactWordcloud from "react-wordcloud";
import { getUserEntries } from "../services/journalService";
import auth from "../services/authService";
import _ from "lodash";

function JournalPage(props) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // TODO: Take out the useEffect in the journal table, and instead call all the data for
    // the JournalPage and feed it down through props or context
    async function getJournals() {
      const uid = auth.getCurrentUser()._id;
      let { data } = await getUserEntries(uid);
      data.map((entry) => (entry.date = entry.date.split("T")[0]));
      console.log(data);
    }

    function countWords(entries) {
      // create an empty array of objects which hav ethe format of text:x, value:y
      // iterate through the array of entries -> go into content
      // seperate content string by .split(), iterate each element of the array
      // checking if the key exists in the empty object
      // if the key does not exist, add it and initialize it to 1
      // else increment the key value
      // setWords(object)
    }

    const journalEntries = getJournals();
    countWords(journalEntries);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <ReactWordcloud words={words} />
        </div>
        <div className="col-6">BOOBS</div>
      </div>
      <div>
        <JournalTable />
      </div>
    </>
  );
}

export default JournalPage;
