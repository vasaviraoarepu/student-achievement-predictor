const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let students = [];

app.post('/save', (req, res) => {
  const student = req.body;
  student.created_at = new Date();
  students.push(student);
  res.json({ success: true });
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(3000, () => console.log('Server running on port 3000'));
