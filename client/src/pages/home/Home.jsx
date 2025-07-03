import './Home.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';



const Home = () => {
  const [date, setDate] = useState(new Date());
  const [scheduledDates, setScheduledDates] = useState([]); // Array of "YYYY-MM-DD"
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/Login");
    } else {

      axios.get('http://localhost:3001/meetings/dates')
        .then(response => {
          const formattedDates = response.data
            .filter(date => !!date) // Remove empty dates
            .map(dateStr => {
              const d = new Date(dateStr);
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
              const day = String(d.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
            });

          setScheduledDates(formattedDates);
        })
        .catch(error => console.error(error));
    }
  }, [authState.status,navigate]);

  // Highlight the dates with "Scheduled"
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (scheduledDates.includes(formattedDate)) {
        return <p className="scheduled-text">Scheduled</p>;
      }
    }
    return null;
  };

  return (
    <div className="home">
      <h1>Welcome to the Meeting Page</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent} // Add the tileContent to show "Scheduled" on selected dates
        />
      </div>
    </div>
  );
}

export default Home;
