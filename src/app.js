const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');
const PORT = process.env.PORT || 3000;
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);


module.exports = app;
