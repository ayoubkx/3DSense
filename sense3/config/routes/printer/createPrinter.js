import { createPrinter } from '../../controllers/printer/createPrinter.js';

// CREATE a printer
export default function createprinter(app) {
  app.put('/api/createprinter', createPrinter);
}
