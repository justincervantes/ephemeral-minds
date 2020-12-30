import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";
import _ from "lodash";
import { getUserEntries } from "../services/journalService";
import { deleteEntry } from "./../services/journalService";
import { toast } from "react-toastify";

function JournalTable(props) {
  const [sortColumn, setSortColumn] = useState({
    path: "date",
    order: "desc",
  });
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    async function getJournals() {
      const uid = auth.getCurrentUser()._id;
      let { data } = await getUserEntries(uid);
      data = _.orderBy(data, sortColumn.path, sortColumn.order);
      data.map((entry) => {
        entry.date = entry.date.split("T")[0];
        entry.updatedDate = entry.updatedDate.split("T")[0];
      });
      setData(data);
      setSortedData(data);
    }
    getJournals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deletePost(journalEntry) {
    let copySortedData = [...sortedData];
    let copySortedDataOriginal = [...sortedData];
    let indexToPop = sortedData
      .map((item) => item._id)
      .indexOf(journalEntry._id);
    copySortedData.splice(indexToPop, 1);
    setSortedData(copySortedData);
    let response = await deleteEntry(journalEntry);
    if (response.data.deletedCount !== 1) {
      toast.error(
        "We were unable to delete the journal entry at this time... an unexpected error occurrred."
      );
      setSortedData(copySortedDataOriginal);
    }
  }

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (post) => <Link to={`/posts/${post._id}`}>{post.title}</Link>,
    },
    { path: "content", label: "Content" },
    { path: "date", label: "Created On Date" },
    { path: "updatedDate", label: "Updated On Date" },
    {
      key: "delete",
      content: (journalEntry) => (
        <button
          onClick={() => deletePost(journalEntry)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  let handleSort = (sortColumn) => {
    console.log(sortColumn);
    setSortColumn(sortColumn);
    let sortedData = _.orderBy(data, sortColumn.path, sortColumn.order);
    setSortedData(sortedData);
  };

  return (
    <React.Fragment>
      <Link to="/new-entry" className="btn btn-primary my-3">
        New Entry <i className="fa fa-plus-square-o" aria-hidden="true"></i>
      </Link>
      <Table
        columns={columns}
        data={sortedData}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
    </React.Fragment>
  );
}

export default JournalTable;
