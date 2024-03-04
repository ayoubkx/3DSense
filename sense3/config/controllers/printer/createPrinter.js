import API from '../../api.js';

async function createPrinter(username, printerId, status, printerName) {
  try {
    // Check if the user exists
    const existingUserResponse = await API.get(`/users/${username}.json`);
    const existingUserData = existingUserResponse.data;

    if (!existingUserData) {
      return { error: 'User does not exist' };
    }

    // Check if a printer with the same username and printerName already exists
    const existingPrinterResponse = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"&orderBy="printerName"&equalTo="${printerName}"`
    );

    const existingPrinterData = existingPrinterResponse.data;
    if (!existingPrinterData) {
      // Printer with the same username and printerName already exists, return an error
      return {
        error: 'Printer with the same username and printerName already exists',
      };
    }

    // Create the printer
    const printerData = {
      username: username,
      printerId: printerId,
      status: status,
      printerName: printerName,
    };

    const createPrinterResponse = await API.post(`/printers.json`, printerData);

    if (createPrinterResponse.data) {
      // Printer created successfully
      console.log('Printer created successfully:', printerData);
      return { success: true };
    } else {
      // Handle the case where the printer wasn't properly created
      return { error: 'Printer could not be created' };
    }
  } catch (error) {
    console.error('Error creating printer:', error);
    return { error: 'An error occurred while creating the printer' };
  }
}

export { createPrinter };

// POSTMAN TEST (UNCOMMENT WHEN TETSING THE API)
// import API from '../../api.js';

// async function createPrinter(req, res) {
//   try {
//     const username = req.body.username;
//     const printerName = req.body.printerName;

//     // Check if the user exists
//     const existingUserResponse = await API.get(`/users/${username}.json`);
//     const existingUserData = existingUserResponse.data;

//     if (!existingUserData) {
//       return { error: 'User does not exist' };
//     }

//     // Check if a printer with the same username and printerName already exists
//     const existingPrinterResponse = await API.get(
//       `/printers.json?orderBy="username"&equalTo="${username}"&orderBy="printerName"&equalTo="${printerName}"`
//     );

//     const existingPrinterData = existingPrinterResponse.data;
//     if (!existingPrinterData) {
//       // Printer with the same username and printerName already exists, return an error
//       return {
//         error: 'Printer with the same username and printerName already exists',
//       };
//     }

//     // Create the printer
//     const printerData = {
//       username: req.body.username,
//       printerId: req.body.printerId,
//       status: req.body.status,
//       printerName: req.body.printerName,
//     };

//     const createPrinterResponse = await API.post(`/printers.json`, printerData);

//     if (createPrinterResponse.data) {
//       // Printer created successfully
//       console.log('Printer created successfully:', printerData);
//       return { success: true };
//     } else {
//       // Handle the case where the printer wasn't properly created
//       return { error: 'Printer could not be created' };
//     }
//   } catch (error) {
//     console.error('Error creating printer:', error);
//     return { error: 'An error occurred while creating the printer' };
//   }
// }

// export { createPrinter };
