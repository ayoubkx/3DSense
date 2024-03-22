import { deletePrinter } from '../../controllers/printer/deletePrinter.js';

// delete a specific printer by  entering username and printername
export default function deleteprinter(app) {
  app.delete('/api/deleteprinter', deletePrinter);
}
