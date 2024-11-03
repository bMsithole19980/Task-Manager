require('dotenv').config();

const express = require("express");
const db = require("../config/firebase");
const tasksRoutes = require('./routes/tasksRoutes');
const app = express();

//middlewares
app.use(express.json());
//project routes
app.use("/api", tasksRoutes);

//access the enviroment viriable

const PORT = process.env.PORT || 5000;
const apikey = process.env.OPENAI_API_KEY;


// console.log('API KEY', apikey);

app.listen(PORT,()=> console.log(`Server runing at port ${PORT}`));
