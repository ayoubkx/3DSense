import { createPrinter } from '../../controllers/printer/createPrinter.js';

// CREATE a printer
export default function createprinter(app) {
  app.post('/api/createprinter', createPrinter);
}
