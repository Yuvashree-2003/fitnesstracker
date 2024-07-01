const express = require('express');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profile');


const app = express();
app.use('/profile', profileRoutes);

connectDB();

app.use(express.json());


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/records', require('./routes/records'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/goals', require('./routes/goals'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${port}'));