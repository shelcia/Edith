import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const URL = process.env.REACT_APP_HEROKU_LINK;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URL}api/auth/users`)
      .then((response) => {
        // console.log(response.data);
        setIsLoading(false);
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, [URL]);

  const convertDate = (date) => {
    const dates = new Date(date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(dates);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <div className='container my-5 shadow p-4 rounded'>
        {isLoading ? (
          <Loading message='Loading Participant Details' />
        ) : (
          <div className='container' id='accordion'>
            {users.map((user) => (
              <div
                className='card mb-4'
                key={user._id}
                style={{ height: "75vh", overflowY: "scroll" }}>
                <div className='card-header'>
                  <a className='card-link' data-toggle='collapse' href='#name'>
                    {user.name}
                  </a>
                </div>
                <div className='card-body'>
                  <p>Email: {user.email}</p>
                </div>
                <div className='card-body mb-4'>
                  <p>Points: {user.point}</p>
                </div>
                <div className='card-body mb-4'>
                  <p>
                    Attendance:
                    {user.isParticipated ? "Attended" : "Not Attended"}
                  </p>
                </div>
                <div className='card-body mb-4'>
                  <p className='text-primary'>All Submissions</p>
                </div>
                {user.submission.map((sub) => (
                  <div className='mb-4' key={sub.timeStamp}>
                    <table className='table table-hover w-75 mx-auto shadow'>
                      <tbody>
                        <tr>
                          <th>Hint Title: </th>
                          <td>{sub.hintTitle}</td>
                        </tr>
                        <tr>
                          <th>Submitted Answer: </th>
                          <td>{sub.answer}</td>
                        </tr>
                        <tr>
                          <th>Result: </th>
                          <td>{sub.isCorrect ? "Correct" : " Wrong"}</td>
                        </tr>
                        <tr>
                          <th>Time Stamp: </th>
                          <td>
                            {sub.timeStamp ? convertDate(sub.timeStamp) : ""}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
                <div className='card-body mb-4'>
                  <p className='text-primary'>All Opened Hints</p>
                </div>
                {user.isHintOpen.map((hint) => (
                  <div className='mb-4' key={hint.timeStamp}>
                    <table className='table table-hover w-75 mx-auto shadow'>
                      <tbody>
                        <tr>
                          <th>Hint Title: </th>
                          <td>{hint.hintTitle}</td>
                        </tr>
                        <tr>
                          <th>Time Stamp: </th>
                          <td>
                            {hint.timeStamp ? convertDate(hint.timeStamp) : " "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
