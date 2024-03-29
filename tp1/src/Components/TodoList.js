import React, { useState, useEffect } from 'react';

const fetchList = async () => {
  try {
    const response = await fetch('http://localhost:3000/list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

const updateStatusInBackend = async (id, newStatus) => {
  try {
    const response = await fetch(`http://localhost:3000/updateStatus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Optionally, you can return the updated entry from the backend
    const updatedEntry = await response.json();
    return updatedEntry;
  } catch (error) {
    console.error("There was a problem updating the status:", error);
    return null;
  }
};

export default function TodoList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchList();
      setList(data);
    };

    fetchData();
  }, [list]);

  const handleStatusChange = async (event, title, deadline, id) => {
    const newStatus = event.target.value;
    console.log(`Status changed to ${newStatus} for entry with title ${title} and deadline ${deadline}`);

    // Update the status in the backend
    const updatedEntry = await updateStatusInBackend(id, newStatus);

    // Update the list state with the updated entry
    if (updatedEntry) {
      setList((prevList) => prevList.map(entry => (
        entry._id === id ? updatedEntry : entry
      )));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((entry) => (
            <tr key={`${entry.title}-${entry.deadline}`} style={{ backgroundColor: entry.status === 'completed' ? '#dff0d8' : (entry.status === 'cancelled' ? '#f2dede' : '') }}>
              <td>{entry.title}</td>
              <td>{new Date(entry.Deadline).toLocaleDateString()}</td>
              <td>{entry.status}</td>
              <td>
                {entry.status !== 'completed' && entry.status !== 'cancelled' ? (
                  <select
                    className="form-select"
                    value={entry.status}
                    onChange={(event) => handleStatusChange(event, entry.title, entry.Deadline, entry._id)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
