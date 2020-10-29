import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const URL = process.env.REACT_APP_HEROKU_LINK;

  useEffect(() => {
    axios
      .get(`${URL}api/auth/users`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, [URL]);
  return (
    <React.Fragment>
      <div className='container my-5 shadow p-4 rounded'>
        <div className='container' id='accordion'>
          {users.map((user) => (
            <div className='card mb-4' key={user._id}>
              <div className='card-header'>
                <a className='card-link' data-toggle='collapse' href='#name'>
                  {user.name}
                </a>
              </div>
              <div className='card-body'>
                <p>Email: {user.email}</p>
              </div>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {user.submission.map((sub) => (
                    <React.Fragment key={sub.hintTitle}>
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
                      <tr style={{ borderBottom: "1px solid blue" }}>
                        <th>Time Stamp: </th>
                        <td>{sub.timeStamp}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;

// <div id="accordion">

//   <div class="card">
//     <div class="card-header">
//       <a class="card-link" data-toggle="collapse" href="#collapseOne">
//         Collapsible Group Item #1
//       </a>
//     </div>
//     <div id="collapseOne" class="collapse show" data-parent="#accordion">
//       <div class="card-body">
//         Lorem ipsum..
//       </div>
//     </div>
//   </div>

//   <div class="card">
//     <div class="card-header">
//       <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
//         Collapsible Group Item #2
//       </a>
//     </div>
//     <div id="collapseTwo" class="collapse" data-parent="#accordion">
//       <div class="card-body">
//         Lorem ipsum..
//       </div>
//     </div>
//   </div>

//   <div class="card">
//     <div class="card-header">
//       <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">
//         Collapsible Group Item #3
//       </a>
//     </div>
//     <div id="collapseThree" class="collapse" data-parent="#accordion">
//       <div class="card-body">
//         Lorem ipsum..
//       </div>
//     </div>
//   </div>

// </div>
