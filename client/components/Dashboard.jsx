import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Entries from './Entries.jsx';

const Dashboard = () => {
  let userIdFromState = useSelector((state) => state);
  return (
    <div>
      <label>User ID:</label>
      <span>{userIdFromState.userID}</span>
      <br /> <br />
      <Entries />
      <button>
        <Link to="/login">Sign out</Link>
      </button>
    </div>
  );
};

export default Dashboard;
