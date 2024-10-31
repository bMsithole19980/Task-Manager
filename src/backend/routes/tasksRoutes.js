const express = require('express');
const router = express.Router();
const {db} = require('../../config/firebase');
const {collection , addDoc ,  getDocs, doc ,updateDoc ,deleteDoc, getDoc} = require('firebase/firestore');

//Reference to the tasks collections in fiirestore
const taskCollection = collection(db , 'Tasks');

// create ne task  POST/ tasks
router.post('/Tasks', async(req , res)=>{
    try{
        const {title , description , dueDate } = req.body;
        const newTask={
            title,
            task,
            dueDate,
            priority,
            createAt: new Date(),
        };
        const docRef = await addDoc(taskCollection, newTask);
        res.status(201).json({id: docRef.id , ...newTask});

    }catch(error){
        console.error('Error adding task', error);
        res.status(500).send('Error cfreating task');
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