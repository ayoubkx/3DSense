// Adjust the import statement to import the named export createUser
import { getPrintersByUsername } from '../../controllers/printer/getPrintersByUsername.js';

// CREATE A USER
export default function getPrintersByusername(app) {
  app.get('/api/getuserprinters', getPrintersByUsername);
}
