const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(bodyParser.json()).use(cors()).use(express.json());

app.get('/', (req, res) => {
  res.send('HELLO, THIS IS THE coen390 REST API');
});

require('./routes/user/createUser')(app);

server = app.listen(PORT, console.log(`Server running on ${PORT}`));
module.exports = { app, server };
