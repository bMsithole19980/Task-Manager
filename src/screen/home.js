import React from "react";
import "./home.css";
import FormContainer from "../componets/formContainer";
function home() {
  return (
    <div className="header">
      <div className="header-name">
        <h3>Task Manager</h3>
      </div>
       <FormContainer/>
    </div>
  );
}

export default home;