require('./db/mongoose');
const express = require('express');
const morgan = require('morgan');
const contactRouter = require('./routers/contactRouter');
const userRouter = require('./routers/userRouter')
const cors = require('cors');

////////////////////////////////////////////////////////////////////

const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(contactRouter);
app.use('/users',userRouter);


app.listen(port,()=>{
    console.log('Server is running On Port ' +port)
})