require('dotenv').config();
const express = require('express');
const apiRoute = require('./api/app');

const server = express();

server.get('/', (req, res) => {
  res.json({ message: 'Medley API running' });
});

server.use('/api', apiRoute);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`\n∎∎∎∎∎∎ Listening on port ${PORT} ∎∎∎∎∎∎\n`);
});
