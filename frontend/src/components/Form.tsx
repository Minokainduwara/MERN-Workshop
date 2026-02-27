import { useState, useEffect } from "react";

interface FormProps {
  addStudent: (student: any) => void;
  updateStudent: (student: any) => void;
  editingStudent: any;
}

export default function Form({ addStudent, updateStudent, editingStudent }: FormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age.toString());
    }
  }, [editingStudent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newStudent = { name, age };

    try {
      if (editingStudent) {
        const response = await fetch(`http://localhost:8080/students/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStudent),
        });

        const updated = await response.json();
        updateStudent(updated);
      } else {
        const response = await fetch("http://localhost:8080/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStudent),
        });

        const created = await response.json();
        addStudent(created);
      }

      setName("");
      setAge("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br /><br />
      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}