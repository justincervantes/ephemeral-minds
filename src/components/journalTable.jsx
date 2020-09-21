import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";
import _ from "lodash";
import { getUserEntries } from "../services/journalService";

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
      setData(data);
      setSortedData(data);
    }
    getJournals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (post) => <Link to={`/posts/${post._id}`}>{post.title}</Link>,
    },
    { path: "content", label: "Content" },
    { path: "date", label: "Date" },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
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
