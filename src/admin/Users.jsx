import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const URL = process.env.REACT_APP_HEROKU_LINK;

  const errorNotify = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URL}api/admin/users`)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "200") {
          setIsLoading(false);
          setUsers(response.data.message);
        }
        if (response.data.status === "500") {
          setIsLoading(false);
          errorNotify(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        errorNotify(error);
      });
  }, [URL]);

  return (
    <React.Fragment>
      <ToastContainer />
      <AdminNavbar />
      <div className="container my-5 shadow p-4 rounded">
        {isLoading ? (
          <Loading message="Loading All Users" />
        ) : (
          <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sno </th>
                  <th scope="col">Name/ Team Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AllUsers;
