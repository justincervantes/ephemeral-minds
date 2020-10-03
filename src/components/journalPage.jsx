import React from "react";
import JournalTable from "./journalTable";
import ReactWordcloud from "react-wordcloud";

const words = [
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
];

function JournalPage(props) {
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
