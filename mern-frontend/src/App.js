import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);

  const addStudent = () => {

    if(!name || !dept || !marks){
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:5000/students", {
      name,
      department: dept,
      marks
    }).then(res => {

      setStudents([...students, res.data]);
      setName("");
      setDept("");
      setMarks("");

    });

  };

  return (

    <div className="app-container">

      <div className="card">

        <h1>Student Management System</h1>

        <div className="form">

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Department"
            value={dept}
            onChange={e => setDept(e.target.value)}
          />

          <input
            type="number"
            placeholder="Marks"
            value={marks}
            onChange={e => setMarks(e.target.value)}
          />

          <button onClick={addStudent}>Add Student</button>

        </div>

      </div>


      <div className="list-card">

        <h2>Student Records</h2>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Marks</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.department}</td>
                <td>{s.marks}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>

  );
}

export default App;