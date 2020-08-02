// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; 
// PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Paths db.JSON
const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

// Notes (DATA) - Set variabe notes as an empty array.  Will push here.
// =============================================================
var notes = [];

// Routes
// =============================================================

// Basic route that sends the user first to the root Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/index.html"));
});

// Linking the notes input page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// Post request to add new notes
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
  console.log(notes);
 
    fs.writeFile(outputPath, notes, function(err) {
        if (err) {
            return console.log(err);
        }
      }
      )
});

// Get request to pull all notes from note variable/ array
app.get("/api/notes", function(req, res) {
  res.json(notes);
});


// Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
