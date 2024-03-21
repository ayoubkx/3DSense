import API from '../../api.js';

// This function find a specific user printer by its PrinterName
async function getuserprinters(username, printerName) {
  try {
    // Check if the user has printers
    const existingPrinters = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"&orderBy="printerName"&equalTo="${printerName}"`
    );

    const existingPrintersDatas = existingPrinters.data;

    if (Object.keys(existingPrintersDatas).length === 0) {
      return { success: 'No printers found for this username' };
    } else
      return { success: 'Printers found', printers: existingPrintersDatas };
  } catch (error) {
    console.error('Error searching for printer:', error);
    return { error: 'An error occurred while searching for printers' };
  }
}

export { getuserprinters };
