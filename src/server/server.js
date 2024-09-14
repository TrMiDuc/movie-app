const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.use('/comments', commentRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
