import express from "express";

const app = express();
const port = 8080;

//middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    res.send("post request recieved!");
});



//Student 

interface Student {
    id: number | string;
    name: string;
    age: number;
}

const students: Student[] = [
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 22 },
    { id: 3, name: "Charlie", age: 21 },
];


app.get("/students", (req, res) => {

    res.json(students);
});

app.post("/students", (req, res) => {
    const { id, name, age } = req.body;
    students.push({
        id, name, age
    });
    res.json({ message: "Student added successfully!" });
});

app.delete("/students/:id", (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(student => student.id.toString() === id);
    if (index !== -1) {
        students.splice(index, 1);
        res.json({ message: "Student deleted successfully!" });
    } else {
        res.status(404).json({ message: "Student not found!" });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


