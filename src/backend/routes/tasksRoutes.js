const express = require('express');
const router = express.Router();
const {db} = require('../../config/firebase');
const {collection , addDoc ,  getDocs, doc ,updateDoc ,deleteDoc, getDoc} = require('firebase/firestore');

//Reference to the tasks collections in fiirestore
const taskCollection = collection(db , 'Tasks');

router.post('/Tasks', async (req, res) => {
    try {
        const { title, task, dueDate, priority } = req.body;  // Ensure all fields are received

        // Validate that all fields are provided
        if (!title || !task || !dueDate || !priority) {
            console.error('Missing task data:', req.body);  // Log the request body for debugging
            return res.status(400).json({ error: "Missing task data" });
        }

        const newTask = {
            title,
            task,
            dueDate,
            priority,
            createdAt: new Date() // track date a task waas created
        };

        // Add the new task to these fireba Firestore collection
        const docRef = await addDoc(taskCollection, newTask);
        res.status(201).json({ id: docRef.id, ...newTask }); // Return the created task with ID
        console.log("New task created:", newTask); // Log successful creation
    } catch (error) {
        console.error('Error adding task:', error); // Log the error
        res.status(500).json({ error: "Error creating task" });
    }
});


// Retrieve all tasks (GET/tasks)
router.get('/Tasks', async (req , res) =>{
    try {
        const tasksSnapshot = await getDocs(taskCollection);
        const tasks = tasksSnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        res.json(tasks)
    } catch (error) {
        console.error('Erroor retrieving tasks:' , error);
        res.status(500).send('Error retrieving tasks');
        
    }
});

// get task by id  get single tyask
router.get('/Tasks/:id', async (req, res)=>{
    try {
        const taskDoc = doc (db , 'Tasks', req.params.id);
        const tasksSnapshot = await getDoc(taskDoc);

        if (!tasksSnapshot.exists()){
            return res.status(404).send('Task not found');
            res.json({id: tasksSnapshot.id, ...tasksSnapshot.data() });
        }
    } catch (error) {
        console.error('Error recieving the task ', error);
        res.status(500).send('Error retrieving tasks');
        
    }
});


// PUT /task  update a task
router.put('/Tasks/:id', async (req, res)=>{
    try {
        const taskDoc = doc(db, 'Tasks' , req.params.id);
        const tasksSnapshot = await getDoc(taskDoc);

        if(!tasksSnapshot.exists()){
            return res,status(404).send('Task not found');
        }

        const {title , description , dueDate}= req.body;
        await updateDoc(taskDoc , {title , description, dueDate});
        
        res.json({id: tasksSnapshot.id , title , description , dueDate});
    } catch (error) {
        console.error('Error updating the task ', error);
        res.status(500).send('Error updating task'); 
    }
});

/// delete task by id

router.delete('/Tasks/:id', async(req , res)=> {
    try {
        const taskDoc = doc(db , 'Tasks', req.params.id);
        await deleteDoc(taskDoc);
        res.status(204).send();

    } catch (error) {
        console.error('Error deleting a task ', error);
        res.status(500). send('Error deleting the task');
    }
})

module.exports = router;