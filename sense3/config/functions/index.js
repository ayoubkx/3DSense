const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Firebase Cloud Function to handle status updates
exports.onStatusUpdate = functions.database
    .ref("/printers/{printerId}")
    .onUpdate((change, context) => {
    // Get the previous and current values of the printer status
      const before = change.before.val();
      const after = change.after.val();

      // Check if the status changed
      if (before.status === after.status) {
      // Log if status didn't change
        console.log("Status didn't change");
        return null;
      }

      // If the status changed to "running", start the timer
      if (after.status === "running") {
        console.log("Status  change");
        // Get the current system time
        const startTime = new Date().toLocaleString("en-US", {
          timeZone: "America/Montreal",
        });

        // No need for endTime when the printer is running, set it to null
        const endTime = null;
        const runningTime = null;

        return change.after.ref.update({startTime, endTime, runningTime});
      }

      // If the status changed to "idle", stop the timer and update runningTime
      if (after.status === "idle") {
        console.log("Status change");
        // Get the start time from before the
        // status change and parse it to a Date object
        const beforeStartTime = new Date(before.startTime);

        // Ensure beforeStartTime is valid
        if (!isNaN(beforeStartTime.getTime())) {
          console.log(beforeStartTime.getTime);
          console.log(beforeStartTime.getMinutes);
          console.log(beforeStartTime.getSeconds);
          const currentTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Montreal",
          });

          // Calculate elapsed time since the printer started running
          const elapsedTime =
          new Date(currentTime).getTime() - beforeStartTime.getTime();
          console.log("Elapsed time: " + elapsedTime);

          // Calculate minutes from elapsed milliseconds
          const minutes = Math.floor(elapsedTime / 60000);
          console.log("Minutes: " + minutes);

          // Calculate remaining seconds
          const remainingSeconds = Math.floor((elapsedTime % 60000) / 1000);
          console.log("Remaining seconds: " + remainingSeconds);

          // Format the elapsed time as "X minutes Y seconds"
          const formattedTime = `${minutes} 
          minutes ${remainingSeconds} seconds`;
          console.log("formatting time: " + formattedTime);

          // Get the current system time for endTime
          const endTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Montreal",
          });

          // Update the runningTime and endTime fields and reset the startTime
          return change.after.ref.update({
            runningTime: formattedTime,
            endTime: endTime,
          });
        }
      }

      return null;
    });
