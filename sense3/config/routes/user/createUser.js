// Adjust the import statement to import the named export createUser
import { createUser } from '../../controllers/user/createUser.js';

// CREATE A USER
export default function setupSignupRoute(app) {
  app.put('/api/signup', createUser);
}
