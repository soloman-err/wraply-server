const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2000;
const productsRouter = require('./routes/products');
const db = require('./config/db');
require('dotenv').config();

const corsOptions = {
  origin: `http://localhost:5173`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use('/products', productsRouter);

// ROOT URL
app.get('/', (req, res) => {
  res.send('Welcome to Wraply!');
});

async function startServer() {
  try {
    const database = await db.connect();

    app.listen(port, () => {
      console.log(`Wraply running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
