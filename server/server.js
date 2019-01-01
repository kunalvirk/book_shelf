const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useNewUrlParser : true, useCreateIndex : true});


// Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/', bookRoutes);
app.use('/api/', userRoutes);


app.get('/', (req, res) => {
    res.status(200).send('Hey, you are on index!!')
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server started!!! :D')
})