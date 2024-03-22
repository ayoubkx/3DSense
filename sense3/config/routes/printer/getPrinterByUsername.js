import { getPrintersByUsername } from '../../controllers/printer/getPrintersByUsername.js';

// get all the printers of a user printer by  enteringthe username
export default function getPrintersByusername(app) {
  app.get('/api/getuserprinters', getPrintersByUsername);
}
