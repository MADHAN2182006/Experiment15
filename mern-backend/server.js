const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* =========================
   MongoDB Connection
========================= */

mongoose.connect("mongodb://127.0.0.1:27017/mernDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


/* =========================
   Student Schema
========================= */

const studentSchema = new mongoose.Schema({
    name: String,
    department: String,
    marks: Number
});

const Student = mongoose.model("Student", studentSchema);


/* =========================
   CREATE Student
========================= */

app.post("/students", async (req, res) => {

    const student = new Student(req.body);

    await student.save();

    res.json(student);

});


/* =========================
   READ Students
========================= */

app.get("/students", async (req, res) => {

    const students = await Student.find();

    res.json(students);

});


/* =========================
   Start Server
========================= */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});