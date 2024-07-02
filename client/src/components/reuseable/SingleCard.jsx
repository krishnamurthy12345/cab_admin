import React, { useState, useEffect } from "react";
import axios from "axios";
function UserCountCard() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make the API request when the component mounts
    axios
      .get("http://localhost:5010/api/totalUserCount")
      .then((response) => {
        setTotalUsers(response.data.totalUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching data");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
    <div className="dashboard__wrapper">
      <div className="dashboard__cards">
    <div className="user-count-card">
      <h3>Total User Count</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Total Users: {totalUsers}</p>
      )}
    </div>
    </div></div></div>
  );
}

export default UserCountCard;