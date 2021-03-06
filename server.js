const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// bring routes
const blogRoutes = require('./routes/blog-routes');
const authRoutes = require('./routes/auth-routes');

// app

const app = express();

// db
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Database Connected'));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV == 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
