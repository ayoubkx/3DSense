// POSTMAN TEST (UNCOMMENT WHEN TETSING THE API)
import API from '../../api.js';

async function createPrinter(username, printerName, printerId) {
  try {
    // Check if the user exists
    const existingUserResponse = await API.get(`/users/${username}.json`);
    const existingUserData = existingUserResponse.data;

    if (!existingUserData) {
      console.log('User dosnt exist');
      return { error: 'User dosnt exist' };
    }

    // get the data of the microcontrolloer with the same id
    const existingMicroControllerResponse = await API.get(
      `/printers.json?orderBy="printerId"&equalTo="${printerId}"`
    );
    // get a array of the microcontroller with the printerId
    const existingMicroController = existingMicroControllerResponse.data;
    // Check if the microcontroller exists
    if (Object.keys(existingMicroController).length == 0) {
      console.log(' the microcontroller doesnt exists');
      return {
        error: 'The Printer id doesnt exists, please enter a valid Id ',
      };
    }

    console.log(' the microcontroller with this id exist');

    // Filter all the user printers
    let existingPrinterResponse = await API.get(
      `/printers.json?orderBy="username"&equalTo="${username}"`
    );

    let existingPrinters = existingPrinterResponse.data;

    // Iterate through the user printers to see if one is  matching the  printerName
    let matchingPrinterName = null;
    for (const key in existingPrinters) {
      if (existingPrinters[key].printerName === printerName) {
        matchingPrinterName = key;

        console.log('This printerName already  exist for this user');
        console.log(
          'Here the matching printer : ' +
            key +
            ': ' +
            existingPrinters[key].printerName
        );
        return {
          error: 'The printer Name already exists for this user',
        };
      }
    }

    // Iterate through the user printers to see if there is  a free microcontroller with this id to link it
    existingPrinterResponse = await API.get(`/printers.json`);
    existingPrinters = existingPrinterResponse.data;

    let matchingPrinterId = null;

    for (const key in existingPrinters) {
      if (
        existingPrinters[key].printerId == printerId &&
        existingPrinters[key].printerName == 0
      ) {
        matchingPrinterId = key;

        console.log(' Here the printer that has to be changed : ');
        console.log(matchingPrinterId);
        // Create the printer
        const printerData = {
          username: username,
          printerId: printerId,
          status: 'idle',
          printerName: printerName,
        };

        const createPrinterResponse = await API.put(
          `/printers/${matchingPrinterId}.json`,
          printerData
        );

        if (createPrinterResponse.data) {
          // Printer created successfully
          console.log('Printer created successfully:', printerData);
          return { success: true, printerData: printerData };
        } else {
          // Handle the case where the printer wasn't properly created
          return { error: 'Printer could not be created' };
        }
      }
    }

    console.log(
      'There is no free mircrocontroller with this printer Id to link it '
    );
    return {
      error:
        'There is no free mircrocontroller with this printer Id to link it',
    };
  } catch (error) {
    console.error('Error creating printer:', error);
    return { error: 'An error occurred while creating the printer' };
  }
}

export { createPrinter };

// // POSTMAN TEST (UNCOMMENT WHEN TETSING THE API)
// import API from '../../api.js';

// async function createPrinter(req, res) {
//   try {
//     const username = req.body.username;
//     const printerName = req.body.printerName;
//     const printerId = req.body.printerId;

//     // Check if the user exists
//     const existingUserResponse = await API.get(`/users/${username}.json`);
//     const existingUserData = existingUserResponse.data;

//     if (!existingUserData) {
//       console.log('User dosnt exist');
//       return { error: 'User dosnt exist' };
//     }

//     // get the data of the microcontrolloer with the same id
//     const existingMicroControllerResponse = await API.get(
//       `/printers.json?orderBy="printerId"&equalTo="${printerId}"`
//     );
//     // get a array of the microcontroller with the printerId
//     const existingMicroController = existingMicroControllerResponse.data;
//     // Check if the microcontroller exists
//     if (Object.keys(existingMicroController).length == 0) {
//       console.log(' the microcontroller doesnt exists');
//       return {
//         error: 'The Printer id doesnt exists, please enter a valid Id ',
//       };
//     }

//     console.log(' the microcontroller with this id exist');

//     // Filter all the user printers
//     let existingPrinterResponse = await API.get(
//       `/printers.json?orderBy="username"&equalTo="${username}"`
//     );

//     let existingPrinters = existingPrinterResponse.data;

//     // Iterate through the user printers to see if one is  matching the  printerName
//     let matchingPrinterName = null;
//     for (const key in existingPrinters) {
//       if (existingPrinters[key].printerName === printerName) {
//         matchingPrinterName = key;

//         console.log('This printerName already  exist for this user');
//         console.log(
//           'Here the matching printer : ' +
//             key +
//             ': ' +
//             existingPrinters[key].printerName
//         );
//         return {
//           error: 'The printer Name already exists for this user',
//         };
//       }
//     }

//     // Iterate through the user printers to see if there is  a free microcontroller with this id to link it
//     existingPrinterResponse = await API.get(`/printers.json`);
//     existingPrinters = existingPrinterResponse.data;

//     let matchingPrinterId = null;

//     for (const key in existingPrinters) {
//       if (
//         existingPrinters[key].printerId == printerId &&
//         existingPrinters[key].printerName == 0
//       ) {
//         matchingPrinterId = key;

//         console.log(' Here the printer that has to be changed : ');
//         console.log(matchingPrinterId);
//         // Create the printer
//         const printerData = {
//           username: req.body.username,
//           printerId: req.body.printerId,
//           status: req.body.status,
//           printerName: req.body.printerName,
//         };

//         const createPrinterResponse = await API.put(
//           `/printers/${matchingPrinterId}.json`,
//           printerData
//         );

//         if (createPrinterResponse.data) {
//           // Printer created successfully
//           console.log('Printer created successfully:', printerData);
//           return { success: true, printerData: printerData };
//         } else {
//           // Handle the case where the printer wasn't properly created
//           return { error: 'Printer could not be created' };
//         }
//       }
//     }

//     console.log(
//       'There is no free mircrocontroller with this printer Id to link it '
//     );
//     return {
//       error:
//         'There is no free mircrocontroller with this printer Id to link it',
//     };
//   } catch (error) {
//     console.error('Error creating printer:', error);
//     return { error: 'An error occurred while creating the printer' };
//   }
// }

// export { createPrinter };
