import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Adjust the import path as necessary
import Form from './Components/Form'; // Assuming this is the Form component you mentioned
import TodoList from './Components/TodoList'; // Your other components

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/activities" element={<TodoList />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
