import API from '../../api.js';

// This function find all the printers of a user by its username
async function getPrintersByUsername(username) {
  try {
    // Check if the user has printers
    const existingPrinters = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"`
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

export { getPrintersByUsername };

// POSTMAN TEST (UNCOMMENT WHEN TETSING THE API)

// import API from '../../api.js';
// async function getPrintersByUsername(req, res) {
//   try {
//     const username = req.body.username;

//     // Check if the user has printers
//     const existingPrinters = await API.get(
//       `/printers.json?orderBy="username"&equalTo="${username}"`
//     );

//     const existingPrintersDatas = existingPrinters.data;

//     if (Object.keys(existingPrintersDatas).length === 0) {
//       console.log('No printers found for this username');
//       return { success: 'No printers found for this username' };
//     } else console.log('Printers found for this username:');
//     console.log(existingPrintersDatas);
//     return { success: 'Printers found', printers: existingPrintersDatas };
//   } catch (error) {
//     console.error('Error searching for printer:', error);
//     return { error: 'An error occurred while searching for printers' };
//   }
// }

// export { getPrintersByUsername };
