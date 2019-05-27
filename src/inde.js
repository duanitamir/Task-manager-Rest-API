const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

require('./db/mongoose');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
});