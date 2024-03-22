import { getuserprinter } from '../../controllers/printer/getUserPrinter.js';

// get a specific printer informations  by entering its username and printername
export default function getuserPrinter(app) {
  app.get('/api/getuserprinter', getuserprinter);
}
