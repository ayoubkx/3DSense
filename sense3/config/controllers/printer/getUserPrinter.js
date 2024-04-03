import API from '../../api.js';

async function getuserprinter(printerId) {
  try {
    // Retrieve the printer data from the API
    const existingPrintersResponse = await API.get(
      `/printers.json?orderBy="printerId"&equalTo="${printerId}"`
    );

    // Extract the printer object from the response
    const existingPrintersData = existingPrintersResponse.data;

    // Convert the printer data into an array of printer objects
    const printersArray = Object.values(existingPrintersData);

    // Check if the array is empty
    if (printersArray.length === 0) {
      return { success: 'No printers found for this id' };
    }

    // Return the first printer object found
    return {
      success: 'Printers found',
      printer: printersArray[0] // Assuming you only expect one printer for the given ID
    };
  } catch (error) {
    console.error('Error searching for printer:', error);
    return { error: 'An error occurred while searching for printers' };
  }
}

export { getuserprinter };

// // Postman api test
// import API from '../../api.js';

// // This function find a specific user printer by its PrinterName
// async function getuserprinter(req, res) {
//   try {
//     const username = req.body.username;
//     const printerName = req.body.printerName;
//     // Retrive all printer with this username
//     const existingPrintersResponse = await API.get(
//       `/printers.json?orderBy="username"&equalTo="${username}"`
//     );

//     let existingPrinters = existingPrintersResponse.data;

//     // Iterate through the printers to find the one with the matching printerName
//     let matchingPrinter = null;
//     for (const key in existingPrinters) {
//       if (existingPrinters[key].printerName === printerName) {
//         matchingPrinter = existingPrinters[key];
//         console.log('Printer found:');
//         console.log(matchingPrinter);

//         break;
//       }
//     }

//     if (!matchingPrinter) {
//       console.log('No printers found');
//       return { success: 'No printers found for this username' };
//     } else
//       return {
//         success: 'Printers found',
//         printers: existingPrinters,
//       };
//   } catch (error) {
//     console.error('Error searching for printer:', error);
//     return { error: 'An error occurred while searching for printers' };
//   }
// }

// export { getuserprinter };
