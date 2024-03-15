// Adjust the import statement to import the named export createUser
import { createPrinter } from '../../controllers/printer/createPrinter.js';

// CREATE A USER
export default function createprinter(app) {
  app.post('/api/createprinter', createPrinter);
}
