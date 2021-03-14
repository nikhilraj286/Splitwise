
// const PORT = process.env.PORT || 3001; 
const app = require('./app');
// const db = require('./db/SQL');
const db = require('./models');
const router = require('./routers/router');

app.get('/', (req, res) => {
    res.status(200).send("Splitwise Backend API is Alive!, access the routes to get data!")
})

app.use('/router', router);

db.sequelize.sync().then(() => {
    app.listen(3001, console.log('server started on port 3001'));
})
// app.listen(3001, console.log('server started on port 3001'));
