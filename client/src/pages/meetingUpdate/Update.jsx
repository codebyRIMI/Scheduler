
import './Update.scss';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

const Update = () => {
  const [listOfMeetings, setListOfMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    // If no access token, navigate to login
    if (!accessToken) {
      navigate("/Login");
      return;
    }
  
    // Ensure user is authenticated and email exists
    if (!authState.status || !authState.email) {
      setErrorMsg("Email not available in user context.");
      setLoading(false);
      return;
    }
  
    // Always fetch meetings from backend
    axios
      .get("http://localhost:3001/meetings/invite/email", {
        params: { email: authState.email },
        headers: { accessToken },
      })
      .then((response) => {
        const meetings = response.data.listOfmeetings || [];
        setListOfMeetings(meetings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
        setErrorMsg("Failed to load invitations.");
        setLoading(false);
      });
  }, [authState, navigate]);
  

  if (loading) return <div>Loading invitations...</div>;

  return (
    <div className="update-container">
      {errorMsg ? (
        <div>{errorMsg}</div>
      ) : listOfMeetings.length > 0 ? (
        listOfMeetings.map((value, index) => (
          <div key={index} className="update-card">
            <div className="invitation-header">
              <span className="invitation-text">You got an invitation</span>
            </div>
            <div className="meeting-details">
              <div className="title">
                <strong>Title:</strong> {value.Title}
              </div>
              <div className="desc">
                <strong>Description:</strong> {value.desc}
              </div>
              <div className="meeting-info">
                <div className="date">
                  <strong>Date:</strong> {value.date}
                </div>
                <div className="location">
                  <strong>Location:</strong> {value.location}
                </div>
                <div className="start_time">
                  <strong>Start Time:</strong> {value.start_time}
                </div>
                <div className="end_time">
                  <strong>End Time:</strong> {value.end_time}
                </div>
                <div className="created_by">
                  <strong>created_by:</strong> {value.created_by}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No invitations found.</div>
      )}
    </div>
  );
};

export default Update;

