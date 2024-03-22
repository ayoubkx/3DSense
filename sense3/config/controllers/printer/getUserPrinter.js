import API from '../../api.js';

// This function find a specific user printer by its PrinterName
async function getuserprinter(username, printerName) {
  try {
    // Retrive all printer with this username
    const existingPrintersResponse = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"`
    );

    let existingPrinters = existingPrintersResponse.data;

    // Iterate through the printers to find the one with the matching printerName
    let matchingPrinter = null;
    for (const key in existingPrinters) {
      if (existingPrinters[key].printerName === printerName) {
        matchingPrinter = existingPrinters[key];
        break;
      }
    }

    if (!matchingPrinter) {
      return { success: 'No printers found for this username' };
    } else
      return {
        success: 'Printers found',
        printers: matchingPrinter,
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
