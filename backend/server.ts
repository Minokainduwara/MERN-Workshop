import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import Student from "./model/Student.js";

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all students from DB
app.get("/students", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Add a new student
app.post("/students", async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    const student = await Student.create({ name, age, grade });
    res.json({ message: "Student added successfully!", student });
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Delete a student by id
app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Student.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// Start server & connect to DB
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Sync models
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced.");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

startServer();