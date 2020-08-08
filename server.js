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