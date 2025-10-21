const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("static")); // serve index.html

let students = [];

// Save student data
app.post("/save", (req, res) => {
  const student = { ...req.body, created_at: new Date().toISOString() };
  students.push(student);
  res.json({ message: "Saved!" });
});

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Get student history by name
app.get("/history/:name", (req, res) => {
  const name = req.params.name;
  const history = students.filter(s => s.name === name);
  res.json(history);
});

// Export CSV (optional)
app.get("/export_csv", (req, res) => {
  const header = "Name,Attendance,Marks,Assignment,Category,Score,CreatedAt\n";
  const rows = students.map(s => `${s.name},${s.attendance},${s.marks},${s.assignment},${s.category},${s.score},${s.created_at}`).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=students.csv");
  res.send(header + rows);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
