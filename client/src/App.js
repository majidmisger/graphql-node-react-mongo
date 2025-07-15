import logo from './logo.svg';
import './App.css';
import DataTable from './Components/datatable'; // Assuming DataTable.js is in the same directory
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';



const GET_MEMBERS = gql`
  query GetMembers {
    members {
      username
      email
      global_admin
      current_login_time
      previous_login_time
      approvedApps {
      name
    }
    }
  }
`;
const GET_EVENTS = gql`
  query GetEvents {
    events {
      clist
      updatedAt
      events {
        event
        displayname
        isDisplay
        journey
      }
    }
  }
`;

function App() {

  const [showMembers, setShowMembers] = useState(true);

  const {
    loading: loadingMembers,
    error: errorMembers,
    data: membersData,
  } = useQuery(GET_MEMBERS);

  const {
    loading: loadingEvents,
    error: errorEvents,
    data: eventsData,
  } = useQuery(GET_EVENTS);

  const toggleData = () => {
    setShowMembers(!showMembers);
  };

  if ((showMembers && loadingMembers) || (!showMembers && loadingEvents)) {
    return <p>Loading...</p>;
  }

  if ((showMembers && errorMembers) || (!showMembers && errorEvents)) {
    return (
      <p>
        Error:{' '}
        {showMembers ? errorMembers.message : errorEvents.message}
      </p>
    );
  }

  const formattedMembersData = membersData?.members.map((member, index) => ({
    id: index + 1,
    name: member.username,
    email: member.email,
    'Global Admin': member.global_admin ? 'Yes' : 'No',
    currentLogin: member.current_login_time,
    previousLogin: member.previous_login_time,
    'App Names': member.approvedApps.map(app => app.name).join(', ')
  }));

  const formattedEventsData = eventsData?.events.flatMap((segment, segmentIndex) =>
    segment.events.map((event, eventIndex) => ({
      id: `${segmentIndex + 1}-${eventIndex + 1}`,
      event: event.event,
      displayName: event.displayname,
      journey: event.journey,
      isDisplay: event.isDisplay ? 'Yes' : 'No',
    }))
  );


  return (
       <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>{showMembers ? 'Members' : 'Events'} Data Table</h1>
          <button onClick={toggleData}>
            {showMembers ? 'Show Events' : 'Show Members'}
          </button>
          <DataTable data={showMembers ? formattedMembersData : formattedEventsData} />
        </div>
      </header>
    </div>
  );
}

export default App;
