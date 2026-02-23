import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [student, setStudent] = useState<{ id: number; name: string; age: number }[]>([])

  async function getData(){
    const data = await fetch ("http://localhost:8080/students");
    const jsonData = await data.json();
    setStudent(jsonData);
  }

  console.log(student);

  useEffect(() => {
    getData();
  },[]);

  return (
    <>
      <div>
        <h1>Students List</h1>
        {student.map((student) => (
          <div key={student.id}>
            <p>{student.name}</p>
            <p>{student.age}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App