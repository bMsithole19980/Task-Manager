import './App.css';
import Home from './screen/home'; 
import TaskTable from './screen/taskTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/tasks" element={<TaskTable />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
