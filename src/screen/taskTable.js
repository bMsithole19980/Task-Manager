import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./taskTable.css";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, "Tasks");
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksList = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Tasks", id));
      setTasks(tasks.filter((task) => task.id !== id)); // Update local state
      toast.success("Task successfully deleted!");
    } catch (error) {
      console.error("Error deleting task: ", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask({ ...task });
  };

  const handleSaveClick = async (id) => {
    try {
      const taskRef = doc(db, "Tasks", id);
      await updateDoc(taskRef, updatedTask);

      setTasks(
        tasks.map((task) => (task.id === id ? { ...updatedTask } : task))
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };


  const handleInputChange = (e, field) => {
    setUpdatedTask({
      ...updatedTask,
      [field]: e.target.value,
    });
  };

  const filteredTasks = searchId
    ? tasks.filter((task) => task.id === searchId)
    : tasks;

  return (
    <div>
      <button
      className="backArrow">
        <FontAwesomeIcon size={20} icon={faArrowLeft} onClick={handleBack}  />
      </button>
      
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="Search by Task ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="search-input"
      />

      <table className="task-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Description</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>

              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={updatedTask.task}
                    onChange={(e) => handleInputChange(e, "task")}
                  />
                ) : (
                  task.task
                )}
              </td>

              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="date"
                    value={updatedTask.dueDate}
                    onChange={(e) => handleInputChange(e, "dueDate")}
                  />
                ) : (
                  task.dueDate
                )}
              </td>

              <td>
                {editingTaskId === task.id ? (
                  <select
                    value={updatedTask.isCompleted ? "Yes" : "No"}
                    onChange={(e) => handleInputChange(e, "isCompleted")}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : task.isCompleted ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>

              <td>
                {editingTaskId === task.id ? (
                  <select
                    value={updatedTask.priority}
                    onChange={(e) => handleInputChange(e, "priority")}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                ) : (
                  task.priority
                )}
              </td>

              <td>
                {editingTaskId === task.id ? (
                  <i
                    className="fas fa-save action-icon"
                    onClick={() => handleSaveClick(task.id)}
                    title="Save"
                  ></i>
                ) : (
                  <>
                    <i
                      className="fas fa-edit action-icon"
                      onClick={() => handleEditClick(task)}
                      title="Update"
                    ></i>
                    <i
                      className="fas fa-trash action-icon"
                      onClick={() => handleDelete(task.id)}
                      title="Delete"
                    ></i>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default TaskTable;
