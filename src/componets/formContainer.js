import React, { useState } from 'react';
import './form.css';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newDate } from 'react-datepicker/dist/date_utils';

function FormContainer() {
   const [task, setTask]= useState('');
   const [dueDate, setDueDate] = useState(newDate());


   
   const handleTask =(e)=> {
    e.preventDefault();
    
    if(task.trim()){
      toast.success('Task submitted successfully', task);
    }else{
      toast.error('Please enter task before you submit')
    }
     setTask('');

   }

  return (
    <div className='form_container'>
    <form onSubmit={handleTask}>
          <label>
            Task desc
            <input
          className='input-log'
          type='text'
          placeholder='Enter your task here..'
          value={task}
          onChange={(e)=>setTask(e.target.value)}
          />
            </label>
          
          <br/>
          <DatePicker 
          selected={dueDate} 
          onChange={(date)=> setDueDate(date)}/>

      
      <button type='submit'>Submit</button>
      
    </form>
    <ToastContainer/>
  </div>
  );
}

export default FormContainer;
