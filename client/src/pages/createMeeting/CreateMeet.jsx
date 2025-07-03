import './CreateMeet.scss';
import { Formik, Form, Field} from 'formik';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

const CreateMeet = () => {

  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const [participantsList, setParticipantsList] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);



  const initialValues = {
    Title: '',
    desc: '',
    participants: selectedParticipants, // Store selected participants as an array
    date: '',
    location: '',
    start_time: '',
    end_time: '',
    created_by:'',
  };





  // Fetch participants list (emails only) when the component mounts
  useEffect(() => {
    if (!localStorage.getItem("accessToken")){
      navigate("/login");
    } else{
    axios.get("http://localhost:3001/register/users",{
      headers: { accessToken: localStorage.getItem("accessToken") },
    }) // endpoint returning users
      .then((response) => {
        setParticipantsList(response.data); // the response contains user data
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }
  }, [authState.status, navigate]);





  const onSubmit = (values, { resetForm }) => {
    const updatedValues = {
      ...values,
      participants: selectedParticipants
      .filter(email => email !== authState.email)  // Exclude current user's email when i am submitting, not before that so it will show but after clicking submit, it will get removed , it is a safe backup if excluding the entitre email from the participant list does not work as it will be removed while submitting
      .map(email => ({ email })),  // Map each email to an object with { email: email }
       created_by: authState.email
    };
//     console.log("authState.email:", authState.email);
// console.log("Selected Participants Before Filter:", selectedParticipants);

//     console.log("Updated Form Values before Submit:", updatedValues);
    axios.post("http://localhost:3001/meetings", updatedValues,{
      headers: { accessToken: localStorage.getItem("accessToken") },
  })
      .then((response) => {
        console.log("Data sent successfully:", response);
  
        // Clear the form!
        resetForm(); // <-- This resets all form fields back to initialValues
        setSelectedParticipants([]); // <-- Also clear selected checkboxes
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  





  const handleSelectAll = () => {
    if (selectedParticipants.length === participantsList.length) {
      setSelectedParticipants([]); // Deselect all if all are selected
    } else {
      setSelectedParticipants(participantsList.map(participant => participant.email)); // Select all users
    }
  };





  const handleCheckboxChange = (email) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((item) => item !== email) // Deselect the user
        : [...prevSelected, email] // Select the user
    );
  };





  return (
    <div className="create-meet">
      <div className="create-container">
        <h2>Create a New Meeting</h2>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form className="create-form">
              <Field type="text" name="Title" placeholder="Title" />
              <Field type="text" name="desc" placeholder="Description" />

              <div className="participants-section">
                <button type="button" onClick={handleSelectAll}>
                  {selectedParticipants.length === participantsList.length ? 'Deselect All' : 'Select All'}
                </button>

                <div className="checkbox-list">
                  {participantsList
                   .filter(participant => participant.email !== authState.email) // exclude current user
                  .map((participant, index) => {
                    const isCurrentUser = participant.email === authState.email;
                  
                  return (
                    
                    <div key={index} className="checkbox-item">
                      <Field
                        type="checkbox"
                        id={`participant-${participant.email}`}
                        
                        value={participant.email}
                        checked={selectedParticipants.includes(participant.email)}
                        onChange={() => handleCheckboxChange(participant.email)}
                        disabled={isCurrentUser}  // Prevent selecting yourself as a backup just like in onSubmit
                        
                      />
                      <label htmlFor={`participant-${participant.email}`}>{participant.email}</label>
                    </div>
                  )})}
                </div>
              </div>

              <Field type="date" name="date" placeholder="Date" />
              <Field type="text" name="location" placeholder="Location" />
              <Field type="time" name="start_time" placeholder="Start Time" />
              <Field type="time" name="end_time" placeholder="End Time" />
              <button type="submit">Create Meeting</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateMeet;





