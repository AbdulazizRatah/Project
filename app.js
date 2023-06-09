import React, { useState } from 'react';

const BugTracker = () => {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({ name: '', description: '' });

  // Function to handle adding a new bug to the list
  const addBug = (e) => {
    e.preventDefault();

    if (newBug.name.trim() === '' || newBug.description.trim() === '') {
      return;
    }

    const bug = {
      id: Date.now(),
      name: newBug.name,
      description: newBug.description,
      status: 'Open',
      timestamp: new Date().toLocaleString()
    };

    setBugs([...bugs, bug]);
    setNewBug({ name: '', description: '' });
  };

  // Function to handle updating the status and description of a bug
const updateBugStatusAndDescription = (id, newStatus, newDescription) => {
  const updatedBugs = bugs.map(bug => {
    if (bug.id === id) {
      return { ...bug, status: newStatus, description: newDescription };
    }
    return bug;
  });
  
   setBugs(updatedBugs);
};


  // Function to handle updating the description of a bug
const updateBugDescription = (id, newDescription) => {
  const updatedBugs = bugs.map(bug => {
    if (bug.id === id) {
      return { ...bug, description: newDescription };
    }
    return bug;
  });

  setBugs(updatedBugs);
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

      <form onSubmit={addBug}>
        <div><input
          type="text"
          value={newBug.name}
          onChange={e => setNewBug({ ...newBug, name: e.target.value })}
          placeholder="Enter bug name"
        /></div>
        <div><input
          type="text"
          value={newBug.description}
          onChange={e => setNewBug({ ...newBug, description: e.target.value })}
          placeholder="Enter bug description"
        /></div>
        <button type="submit">Add Bug</button>
      </form>

      <ul>
  {bugs.map(bug => (
    <li key={bug.id}>
      <div>{bug.name}</div>
      <div>{bug.description}</div>
      <div>Status: {bug.status}</div>
      <div>Reported at: {bug.timestamp}</div>
  
      <button onClick={() => updateBugStatusAndDescription(bug.id, 'Fixed', bug.description)}>
        Mark as Fixed
      </button>
      <button onClick={() => updateBugStatusAndDescription(bug.id, 'In Progress', bug.description)}>
        Mark as In Progress
      </button>
      <button onClick={() => updateBugStatusAndDescription(bug.id, 'Open', bug.description)}>
        Reopen
      </button>
      <div><input
        type="text"
      
        size="30"
        onChange={e => updateBugStatusAndDescription(bug.id, bug.status, e.target.value)}
        placeholder="Update bug description"
      /></div>
      <form>
      <button onClick={() => updateBugStatusAndDescription(bug.id, bug.status, bug.description)}>
        Update Status and Description
      </button>
      </form>
    </li>
  ))}
</ul>


    </div>
  );
};

export default BugTracker;
