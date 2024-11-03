import React, { useState } from "react";
import "./form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormContainer() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [isCompleted, setIsCompleted] = useState(false);
  const [priority, setPriority] = useState("Low");
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [recurrence, setRecurrence] = useState("none");

  const navigate = useNavigate();

  const handleTask = async (e) => {
    e.preventDefault();

    if (task.trim()) {
      try {
        console.log("Firestore instance:", db); // Log Firestore instance
        await addDoc(collection(db, "Tasks"), {
          title,
          task,
          dueDate, // Send as Date object
          isCompleted,
          priority,
          recurrence,
        });

        toast.success(`Task submitted successfully.`);
        navigate('/tasks');
      } catch (error) {
        console.error("Error adding task: ", error.message);
        toast.error("Error submitting the task.");
      }
    } else {
      toast.error("Please enter a task before submitting");
    }

    setTask("");
    setIsCompleted(false);
    setPriority("Low");
  };
  const handleSuggestTask = async () => {
    try {
      const response = await axios.post("http://localhost:4000/tasks/suggest", {
        inputText: task,
      });
      setSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  };
 
  return (
    <div className="form_container">
      <form className="form-field" onSubmit={handleTask}>
        <label> 
          Task title
          <input
            className="title-input"
            value={title}
            placeholder="Enter the task title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Task Description:
          <input
            className="input-log"
            type="text"
            placeholder="Enter your task here.."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>

        <label>
          Due Date:
          <br />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="datepicker"
          />
        </label>

        <label>
          Task Completed:
          <select
            value={isCompleted ? "Yes" : "No"}
            onChange={(e) => setIsCompleted(e.target.value === "Yes")}
            className="input-log"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>

        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-log"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Recurrence:
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
            className="input-log"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default FormContainer;
