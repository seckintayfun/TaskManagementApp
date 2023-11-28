import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { validationResult } from "express-validator";
import {
  idValidator,
  createTaskValidator,
  updateTaskValidator,
} from "./utils/validators.js";
import { randomUUID } from "crypto";

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
  const tasks = JSON.parse(await readFile("./data/tasks.json"));
  return res.status(200).json({ tasks });
});

app.post("/tasks", createTaskValidator, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });

  const { task } = req.body;
  const newTask = {
    ...task,
    id: randomUUID(),
    isCompleted: false,
  };
  const tasks = JSON.parse(await readFile("./data/tasks.json"));
  tasks.push(newTask);
  await writeFile("./data/tasks.json", JSON.stringify(tasks));
  return res.status(200).json({ task: newTask });
});

app.put("/tasks:id", updateTaskValidator, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });

  const { id } = req.params;
  const { task } = req.body;
  const tasks = JSON.parse(await readFile("./data/tasks.json"));
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Task not found." });
  tasks[index] = { id, ...task };
  await writeFile("./data/tasks.json", JSON.stringify(tasks));
  return res.status(200).json({ task });
});

app.delete("/tasks:id", idValidator, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });

  const { id } = req.params;
  const tasks = JSON.parse(await readFile("./data/tasks.json"));
  console.log("id: " + id);
  const index = tasks.findIndex((t) => t.id === id);
  console.log("index: " + index);
  if (index === -1) return res.status(404).json({ message: "Task not found." });
  tasks.splice(index, 1);
  await writeFile("./data/tasks.json", JSON.stringify(tasks));
  return res.status(200).json({ message: "Task successfully deleted." });
});

app.listen(8080, () => console.log("Server running on port 8080."));
