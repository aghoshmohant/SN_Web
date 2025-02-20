import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const AcceptVolunteerCall = () => {
  const [volunteerCall, setVolunteerCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [searchParams] = useSearchParams();
  const callId = searchParams.get('id'); // Get the ID from URL

  useEffect(() => {
    if (callId) {
      // Fetch volunteer call details
      axios.get(`http://192.168.215.52:5000/api/call-volunteer/${callId}`)
        .then((response) => {
          setVolunteerCall(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch volunteer call:', err);
          setLoading(false);
        });
    }
  }, [callId]);

  const handleAccept = () => {
    if (!volunteerCall || accepted) return;

    axios.post(`http://192.168.215.52:5000/api/call-volunteer/accept/${callId}`)
      .then(() => {
        setVolunteerCall((prevState) => ({
          ...prevState,
          count: prevState.count - 1,
        }));
        setAccepted(true);
        alert('You have accepted the volunteer call successfully!');
      })
      .catch((err) => {
        console.error('Failed to accept volunteer call:', err);
        alert('Failed to accept the volunteer call. Please try again.');
      });
  };

  if (loading) return <div>Loading...</div>;

  if (!volunteerCall) return <div>No volunteer call found.</div>;

  return (
    <div>
      <h1>Volunteer Call Details</h1>
      <ul>
        <li><strong>Location:</strong> {volunteerCall.location}</li>
        <li><strong>District:</strong> {volunteerCall.district}</li>
        <li><strong>Role:</strong> {volunteerCall.role}</li>
        <li><strong>Contact Number:</strong> {volunteerCall.contact_number}</li>
        <li><strong>Remaining Volunteers Needed:</strong> {volunteerCall.count}</li>
      </ul>

      <button onClick={handleAccept} disabled={accepted || volunteerCall.count <= 0}>
        {accepted ? 'Accepted' : 'Accept Volunteer Call'}
      </button>
    </div>
  );
};

export default AcceptVolunteerCall;
