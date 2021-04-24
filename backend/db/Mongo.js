// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config({ path: __dirname+'/./../config/config.env'});

// // console.log(process.env)

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }).then(con => {
//     // console.log(con.connections)
//     console.log('MongoDB connection successful!')
// }).catch(err => {
//     console.log(err)
// })