import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../api/apiService";
import "../styles/Profile.css";
import { User } from "../type_declarations/types"; // Import User interface

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>(); // Get username from URL params
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const ava = require("../resources/ava.jpg");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      setError("Username is required.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await ApiService.fetchUser(username);
        console.log("Fetched user data:", data); // Debug log
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Fetch user data error:", error); // Debug log
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-pic-wrapper">
          <img src={ava} className="profile-pic" alt="Profile" />
        </div>
        <h2>{userData.username}</h2>
        <p className="profile-role">{userData.role}</p>
      </div>
      <div className="profile-dates">
        <div className="profile-date-item">
          <span className="date-label">Joined: </span>
          <span className="date-value">
            {new Date(userData.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="profile-date-item">
          <span className="date-label">Last updated: </span>
          <span className="date-value">
            {new Date(userData.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
