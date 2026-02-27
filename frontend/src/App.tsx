import React, { useState, useEffect } from "react";
import Form from "./components/Form";

interface Student {
  id: number;
  name: string;
  age: number;
}

function App() {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  async function getStudents() {
    const res = await fetch("http://localhost:8080/students");
    const data = await res.json();
    setStudentsData(data);
  }

  useEffect(() => {
    getStudents();
  }, []);

  const addStudent = (student: Student) => {
    setStudentsData([...studentsData, student]);
  };

  const updateStudent = (updated: Student) => {
    setStudentsData(
      studentsData.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditingStudent(null);
  };

  const deleteStudent = async (id: number) => {
    await fetch(`http://localhost:8080/students/${id}`, {
      method: "DELETE",
    });

    setStudentsData(studentsData.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h1>Students</h1>

      <Form
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      {studentsData.map((student) => (
        <div key={student.id} style={{ marginTop: "20px" }}>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>

          <button onClick={() => setEditingStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;