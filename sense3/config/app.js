// app.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import setupSignupRoute from '../config/routes/user/createUser.js';
import createprinter from '../config/routes/printer/createPrinter.js';
import getPrinterByusername from '../config/routes/printer/getPrinterByUsername.js';
import deleteprinter from '../config/routes/printer/deletePrinter.js';
import getuserPrinter from '../config/routes/printer/getUserPrinter.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('HELLO, THIS IS THE coen390 REST API');
});

setupSignupRoute(app); // Call the function to set up the signup route
createprinter(app);
getPrinterByusername(app);
deleteprinter(app);
getuserPrinter(app);

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export { app, server };
