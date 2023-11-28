import { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import Task from "../Task/Task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:8080/tasks");
      const responseData = await response.json();
      if (!responseData) throw new Error("Failed to load tasks!");
      else setTasks(responseData.tasks);
    };
    fetchTasks();
  }, []);

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
