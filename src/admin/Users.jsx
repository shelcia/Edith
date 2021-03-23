import React, { useCallback, useEffect, useState } from "react";
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

  const getUsers = useCallback(() => {
    axios
      .get(`${URL}api/admin/users`)
      .then((response) => {
        console.log(response.data);
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

  useEffect(() => {
    const ac = new AbortController();
    setIsLoading(true);
    getUsers();
    return () => ac.abort(); // Abort both fetches on unmount
  }, [URL, getUsers]);

  const deleteUser = (e, id) => {
    e.preventDefault();
    console.log(id, `${process.env.REACT_APP_HEROKU_LINK}admin/users/${id}`);

    const token = localStorage.getItem("Edith-admin-token");

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .delete(`${process.env.REACT_APP_HEROKU_LINK}api/admin/users/${id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "200") {
          toast.success(response.data.message);
          getUsers();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        errorNotify(error);
      });
  };

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
                      <button
                        className="btn btn-danger"
                        onClick={(e) => deleteUser(e, item._id)}
                      >
                        Delete
                      </button>
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
