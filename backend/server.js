/*importing and setting up app */
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


/* app will use routes defined in credentials*/ 
const routes = require('./routes/credentials');
app.use('/api',routes);
/* connecting to db*/
mongoose.connect('mongodb://localhost/classroom');
const db = mongoose.connection;
db.on('error', (error) => console.log('Error connecting to db',error));
db.once('open',() => console.log('Successfully connected to db!'));

/* testing to see if server is running*/
app.get('/', (req,res) => {
res.send('server running...');
});


/* listening for requestings on server*/
app.listen(5003, () => {
    console.log('server running on port 5000');
}

);