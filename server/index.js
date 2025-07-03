const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());



//routers
const loginRouter = require('./router/login'); 
app.use('/register', loginRouter);
const meetingRouter = require('./router/meeting');
app.use('/meetings' , meetingRouter);


// db connected
mongoose.connect('mongodb://localhost:27017/meeting', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});