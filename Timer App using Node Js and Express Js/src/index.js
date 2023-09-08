const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../timer/build")));

app.use(express.json());

// Define a route to save timer details
app.post("/api/save-timer", (req, res) => {
  const timerDetails = req.body;

  // Read existing data from the JSON file, if any
  let existingData = [];
  try {
    existingData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "timerDetails.json"), "utf-8")
    );
  } catch (error) {
    console.error("Error reading data from JSON file:", error);
  }

  // Add the new timer details to the existing data
  existingData.push(timerDetails);

  // Write the updated data back to the JSON file
  try {
    fs.writeFileSync(
      path.join(__dirname, "data", "timerDetails.json"),
      JSON.stringify(existingData, null, 2)
    );
    console.log("Timer details saved to JSON file.");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error writing data to JSON file:", error);
    res.status(500).send("Failed to save timer details.");
  }
});

// Default route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../timer/build/index.html"));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});



// References 
// https://leejjon.medium.com/create-a-react-app-served-by-express-js-node-js-and-add-typescript-33705be3ceda
// https://itsjavascript.com/npm-err-missing-script-start#:~:text=The%20npm%20err%21%20missing%20script%3A%20start%20mainly%20occurs,the%20main%20entry%20path%20in%20the%20package.json%20file.
// https://stackoverflow.com/questions/47928735/react-scripts-is-not-recognized-as-an-internal-or-external-command
