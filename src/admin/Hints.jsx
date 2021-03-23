import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Loading from "../components/Loading";

const Hint = () => {
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const URL = process.env.REACT_APP_HEROKU_LINK;

  //GET HINTS

  const getHints = useCallback(() => {
    axios
      .get(`${URL}api/admin/hints`)
      .then((response) => {
        console.log("hints", response.data.message);
        setHints(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [URL]);

  useEffect(() => {
    const ac = new AbortController();
    setIsLoading(true);
    getHints();
    return () => ac.abort(); // Abort both fetches on unmount
  }, [URL, getHints]);

  return (
    <React.Fragment>
      <AdminNavbar />
      <div className="container shadow-lg mt-4 p-2">
        {isLoading ? (
          <Loading message="Loading All Hints" />
        ) : (
          <React.Fragment>
            <div className="d-flex justify-content-between px-4 py-2">
              <h2>Hints</h2>
              <button className="btn btn-primary">Add Hint</button>
            </div>
            <table class="table px-1">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Hint Title</th>
                  <th>Hint Desc.</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hints.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item.hintTitle}</td>
                    <td>{item.hint}</td>
                    <td style={{ wordBreak: "break-word" }}>{item.answer}</td>
                    <td className="d-flex">
                      <button className="btn btn-primary text-light mr-1">
                        <i className="material-icons">edit</i>
                      </button>
                      <button className="btn btn-danger text-light">
                        <i className="material-icons">delete</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Hint;
