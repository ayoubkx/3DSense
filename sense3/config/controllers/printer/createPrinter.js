import API from '../../api.js';

async function createPrinter(username, printerName) {
  try {
    // Check if the user exists
    const existingUserResponse = await API.get(`/users/${username}.json`);
    const existingUserData = existingUserResponse.data;

    if (!existingUserData) {
      return { error: 'User dosnt exist' };
    }

    // Check if a printer with the same username and printerName already exists
    const existingPrinterResponse = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"`
    );

    const existingPrinters = existingPrinterResponse.data;

    // Iterate through the user printers to see if one is  matching the  printerName
    for (const key in existingPrinters) {
      if (existingPrinters[key].printerName === printerName) {
        return {
          error:
            'Printer with the same username and printerName already exists',
        };
      }
    }

    // Create the printer
    const printerData = {
      username: username,
      status: 'idle',
      printerName: printerName,
    };
    const createPrinterResponse = await API.post(`/printers.json`, printerData);

    if (createPrinterResponse.data) {
      // Printer created successfully

      return { success: true, printerData: printerData };
    } else {
      // Handle the case where the printer wasn't properly created
      return { error: 'Printer could not be created' };
    }
  } catch (error) {
    console.error('Error creating printer:', error);
    return { error: `An error occurred while creating the printer: ${error.message}` };
  }
}

export { createPrinter };
