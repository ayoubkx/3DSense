import API from '../../api.js';

// This function finds a specific user printer by its PrinterName and deletes it from the database
async function deletePrinter(username, printerName) {
  try {
    // Retrive all printer with this username
    const existingPrintersResponse = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"`
    );

    const existingPrinters = existingPrintersResponse.data;

    // Iterate through the printers to find the one with the matching printerName
    let printerKeyToDelete = null;
    let deletedPrinter = null;
    for (const key in existingPrinters) {
      if (existingPrinters[key].printerName === printerName) {
        printerKeyToDelete = key;
        deletedPrinter = existingPrinters[key];

        break;
      }
    }

    if (!printerKeyToDelete) {
      return { success: 'No printers found for this username and printerName' };
    } else {
      // Delete the printer from the database
      await API.delete(`/printers/${printerKeyToDelete}.json`);

      return {
        success: 'Printer deleted successfully',
        deletedPrinter: deletedPrinter,
      };
    }
  } catch (error) {
    console.error('Error deleting printer:', error);
    return { error: 'An error occurred while deleting printer' };
  }
}

export { deletePrinter };

// //POSTMAN TEST

// import API from '../../api.js';

// // This function finds a specific user printer by its PrinterName and deletes it from the database
// async function deletePrinter(req, res) {
//   const username = req.body.username;
//   const printerName = req.body.printerName;

//   try {
//     // Check if the user has this printer
//     const existingPrintersResponse = await API.get(
//       `/printers.json?orderBy="username"&equalTo="${username}"`
//     );

//     const existingPrinters = existingPrintersResponse.data;

//     // Iterate through the printers to find the one with the matching printerName
//     let printerKeyToDelete = null;
//     let deletedPrinter = null;
//     for (const key in existingPrinters) {
//       if (existingPrinters[key].printerName === printerName) {
//         printerKeyToDelete = key;
//         deletedPrinter = existingPrinters[key];

//         console.log(' printer db Identifier to delete : ' + key);
//         break;
//       }
//     }

//     if (!printerKeyToDelete) {
//       console.log('This printer does not exist');
//       return { success: 'No printers found for this username and printerName' };
//     } else {
//       // Delete the printer from the database
//       const deletedPrinterResponse = await API.delete(
//         `/printers/${printerKeyToDelete}.json`
//       );

//       console.log('Printer is delated successfully:');
//       console.log(deletedPrinter);
//       return {
//         success: 'Printer deleted successfully',
//         deletedPrinter: deletedPrinterResponse.data,
//       };
//     }
//   } catch (error) {
//     console.error('Error deleting printer:', error);
//     return { error: 'An error occurred while deleting printer' };
//   }
// }

// export { deletePrinter };
