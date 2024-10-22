import React, { useState } from 'react';
import './form.css';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormContainer() {
   const [task, setTask]= useState('');

   
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
      
          <input
          type='text'
          placeholder='Enter your task here..'
          value={task}
          onChange={(e)=>setTask(e.target.value)}
          />
      <br/>
      <button type='submit'>Submit</button>
      
    </form>
    <ToastContainer/>
  </div>
  );
}

export default FormContainer;
