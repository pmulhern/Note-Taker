// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Paths db.JSON
const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

// Notes (DATA) - Set variabe notes as an empty array.  Will push here.
// =============================================================
let notes = [];

// Routes
// =============================================================
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Basic route that sends the user first to the root Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Loads/ Displays stored notes from db.json when the notes page is initially loaded
app.get("/api/notes", function(req, res) {

  try{
      notes = fs.readFileSync(outputPath, "utf8");
      notes = JSON.parse(notes);
  } catch(err) {
      console.log(err);
  }
  res.json(notes)
});

// Post api is taking information posted from the front end end storing to the db.json and showing new notes on notes page list
app.post("/api/notes", function(req, res) {
  try {
      notes = fs.readFileSync(outputPath, "utf8");
      notes = JSON.parse(notes);
      req.body.id = notes.length + 1;
      console.log(req.body.id)
      
      notes.push(req.body);
      notes = JSON.stringify(notes);
      console.log(notes)
      
      fs.writeFile(outputPath, notes, "utf8", function(err) {
          if(err) throw err;
      });

      res.json(JSON.parse(notes));
      
      
  } catch(err) {
      console.log(err);
  }
});

// Delete api is targeting the ID setup in the post and removing that note from the db.json, then returning a new list of notes
app.delete("/api/notes/:id",function (req, res) {
  try {
    notes = fs.readFileSync(outputPath, "utf8");
    notes = JSON.parse(notes);
    notes = notes.filter(function(note){
      return note.id != req.params.id;
    }); 
    
    notes = JSON.stringify(notes);
    console.log(notes)
    
    fs.writeFile(outputPath, notes, "utf8", function(err) {
        if(err) throw err;
    });
    
    res.send(JSON.parse(notes));
    // Above is same as below.  Response back to the Delete API
    // res.json(JSON.parse(notes));
} catch(err) {
    console.log(err);
}

});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
