const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const backcouerses=require('./routes/routes')

const port = 5000;
const app=express()

app.use(bodyparser.json())
app.use('/api/courses',backcouerses)
const mongoUrl = 'mongodb://localhost:27017/coursesdb';

mongoose.connect(mongoUrl)

const db=mongoose.connection
db.on('error',console.error.bind(console,'error de conexion a mongo db'))
db.once('open',()=>{})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


