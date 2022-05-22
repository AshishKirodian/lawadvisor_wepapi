const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const boardsRoute = require('./Boards/Routes/boardsRoute');
const taskRouter = require('./Tasks/Routes/taskRoute');
const searchRouter = require('./Search/Routes/searchRoute');

const app = express();
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use('/board', boardsRoute);

app.use('/task', taskRouter);

app.use('/search', searchRouter);

// starting the server
app.listen(5000, () => {
  console.log('listening on port 5000');
});