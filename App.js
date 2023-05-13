import React, { useState } from 'react';

const BugTracker = () => {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState('');

  // Function to handle adding a new bug to the list
  const addBug = () => {
    if (newBug.trim() === '') {
      return;
    }

    const bug = {
      id: Date.now(),
      description: newBug,
      status: 'Open',
      timestamp: new Date().toLocaleString()
    };

    setBugs([...bugs, bug]);
    setNewBug('');
  };

  // Function to handle updating the status of a bug
  const updateBugStatus = (id, newStatus) => {
    const updatedBugs = bugs.map(bug => {
      if (bug.id === id) {
        return { ...bug, status: newStatus };
      }
      return bug;
    });

    setBugs(updatedBugs);
  };

  return (
    <div>
      <h1>Bug Tracker</h1>

      <div>
        <input
          type="text"
          value={newBug}
          onChange={e => setNewBug(e.target.value)}
          placeholder="Enter bug description"
        />
        <button onClick={addBug}>Add Bug</button>
      </div>

      <ul>
        {bugs.map(bug => (
          <li key={bug.id}>
            <div>{bug.description}</div>
            <div>Status: {bug.status}</div>
            <div>Reported at: {bug.timestamp}</div>
            <button onClick={() => updateBugStatus(bug.id, 'Fixed')}>
              Mark as Fixed
            </button>
            <button onClick={() => updateBugStatus(bug.id, 'In Progress')}>
              Mark as In Progress
            </button>
            <button onClick={() => updateBugStatus(bug.id, 'Open')}>
              Reopen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugTracker;