import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ApiService from "../../../api/apiService";
import "../../../styles/Profile.css";
import {
  User,
  WordProgress,
  Word,
  Report,
  Follower,
  ROLE,
} from "../../../type_declarations/types";
import { useAppSelector } from "../../../redux/hooks";
import Spinner from "../../spinner/Spinner";
import Util from "../../../util/util";

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const usernameRedux = useAppSelector((state) => state.session.username);
  const ownProfile = username === usernameRedux;

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
        console.log("Fetched user data:", data);
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Fetch user data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const aggregateWordProgresses = (wordProgresses: WordProgress[]) => {
    const aggregatedProgresses: { [wordId: string]: WordProgress } = {};

    wordProgresses.forEach((progress) => {
      const wordId = progress.word.id;

      if (aggregatedProgresses[wordId]) {
        aggregatedProgresses[wordId].tries += progress.tries;
        aggregatedProgresses[wordId].successful =
          aggregatedProgresses[wordId].successful && progress.successful;
      } else {
        aggregatedProgresses[wordId] = { ...progress };
      }
    });

    return Object.values(aggregatedProgresses);
  };

  const calculateSuccessRate = (tries: number, successful: boolean) => {
    const rate = successful ? 100 : Math.round((100 * tries) / (tries + 1));
    const color = rate > 50 ? "green" : "red";
    return { rate, color };
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        {error}
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

  if (!userData) {
    return <div className="error-container">No user data found.</div>;
  }

  const aggregatedWordProgresses = aggregateWordProgresses(
    userData.wordProgresses
  );

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-pic-wrapper">
          <img
            src={require("../../../resources/avatar-template.jpg")}
            className="profile-pic"
            alt="Profile"
          />
        </div>
        <h2>{userData.username}</h2>
        <span className="profile-role">
          {userData.role === "ROLE_ADMIN" ? (
            ownProfile ? <Link to={`/admin/`}>Administrator</Link> : "Administrator"
          ) : (
            "User"
          )}
        </span>
      </div>

      {/* Word Progress Section */}
      <div className="section word-progress-section">
        <h3>Word Progress</h3>
        <div className="word-progress-list">
          {aggregatedWordProgresses.length === 0 ? (
            <div>
              <p>No progress yet 😭</p>
            </div>
          ) : (
            aggregatedWordProgresses.map(
              (progress: WordProgress, index: number) => {
                const { rate, color } = calculateSuccessRate(
                  progress.tries,
                  progress.successful
                );
                return (
                  <div key={index} className="word-progress-item">
                    <div className="word-progress-item-info">
                      <h3 className="word-progress-title-wrapper">
                        <span className="word-progress-title-span">
                          {progress.word.kana}
                        </span>{" "}
                        <span>X{progress.tries}</span>
                      </h3>
                      <div className="word-variants">
                        <span>
                          <strong>English:</strong> {progress.word.english}
                        </span>
                        <span>
                          <strong>Kanji:</strong> {progress.word.kanji}
                        </span>
                      </div>
                      <div className="word-progress-item-stats">
                        {" "}
                        <span>
                          <strong>Success: </strong>
                          <span style={{ color }}>{rate}%</span>
                        </span>
                        <div className="success-bar-container">
                          <div
                            className="success-bar"
                            style={{
                              width: `${rate}%`,
                              backgroundColor: color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>

      {/* Created Words Section */}
      {userData.createdWords.length > 0 && (
        <div className="section">
          <h3>Created Words</h3>
          <ul className="created-words-list">
            {userData.createdWords.map((word: Word) => (
              <li key={word.id}>
                <p>
                  <strong>English:</strong> {word.english}
                </p>
                <p>
                  <strong>Kana:</strong> {word.kana}
                </p>
                <p>
                  <strong>Kanji:</strong> {word.kanji}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reports Section */}
      {userData.reports.length > 0 && (
        <div className="section">
          <h3>Reports</h3>
          <div className="reports-container">
            {userData.reports.map((report: Report) => (
              <div key={report.id} className="report-card">
                <p>
                  <strong>Reported Word:</strong> {report.reportedWord}
                </p>
                <p>
                  <strong>Input Value:</strong> {report.inputValue}
                </p>
                <p>
                  <strong>App Mode:</strong> {report.appMode}
                </p>
                <p>
                  <strong>Variant:</strong> {report.variant}
                </p>
                {report.notes && (
                  <p>
                    <strong>Notes:</strong> {report.notes}
                  </p>
                )}
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {report.state}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Followers and Following Section */}
      <div className="section followers-following-section">
        <div className="followers-list">
          <h3>Followers</h3>
          <div>
            {userData.followers.map((follower: Follower) => (
              <Link
                key={follower.following}
                to={`/profile/${follower.following}`}
              >
                <div className="follower-profile">
                  <img src={`https://via.placeholder.com/50`} alt="Follower" />
                  <span>{follower.following}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="following-list">
          <h3>Following</h3>
          <div>
            {userData.followingUsers.map((followingUser: Follower) => (
              <Link
                key={followingUser.followed}
                to={`/profile/${followingUser.followed}`}
              >
                <div className="follower-profile">
                  <img src={`https://via.placeholder.com/50`} alt="Following" />
                  <span>{followingUser.followed}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
