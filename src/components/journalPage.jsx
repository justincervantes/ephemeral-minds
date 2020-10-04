import React, { useEffect, useState } from "react";
import JournalTable from "./journalTable";
import ReactWordcloud from "react-wordcloud";
import { getUserEntries } from "../services/journalService";
import auth from "../services/authService";
import _ from "lodash";

function JournalPage(props) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // TO DO: REMOVE COMMON ARTICLES LIKE A, THE FROM THE WORD FREAK

    // create an empty array of objects which hav ethe format of text:x, value:y
    // iterate through the array of entries -> go into content
    // seperate content string by .split(), iterate each element of the array
    // checking if the key exists in the empty object
    // if the key does not exist, add it and initialize it to 1
    // else increment the key value
    // setWords(object)
    function countWords(entries) {
      const wordFreq = [];
      // Iterating through all Journal data
      for (let i = 0; i < entries.length; i++) {
        let journalWordArray = entries[i].content
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
          .split(" ");
        console.log("journalWordArray: " + journalWordArray);

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
    // TODO: Take out the useEffect in the journal table, and instead call all the data for
    // the JournalPage and feed it down through props or context
    async function getJournals() {
      const uid = auth.getCurrentUser()._id;
      let { data } = await getUserEntries(uid);
      data.map((entry) => (entry.date = entry.date.split("T")[0]));
      console.log(data);
      return countWords(data);
    }

    getJournals();
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
