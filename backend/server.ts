import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";


const app = express();
const port = 8080;

//middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    res.send("post request recieved!");
});

//database
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connection established successfully.");

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (error: any) {
        console.error("❌ Unable to connect to the database:", error.message);
    }
}

startServer();
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

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);  // Convert id to a number
    students.splice(id - 1, 1);  // Adjust index to match array indexing
    res.json({message: 'Student deleted successfully'});
    });

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


