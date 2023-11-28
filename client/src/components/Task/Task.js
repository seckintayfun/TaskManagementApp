import Card from "../Card/Card";
import { GoTrash } from "react-icons/go";
import styles from "./Task.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

const Task = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState();

  const showModal = (actionType) => {
    setAction(actionType);
    setOpenModal(true);
  };

  const hideModal = () => setOpenModal(false);

  const handleTask = async () => {
    if (action === "delete") {
      console.log("deletinggg " + task.id);
      const response = await fetch("http://localhost:8080/tasks/" + task.id, {
        method: "DELETE",
      });
      const responseData = await response.json();
      if (!responseData) throw new Error("Failed to delete the task!");
    } else if (action === "complete") {
      const response = await fetch("http://localhost:8080/tasks/" + task.id, {
        method: "PUT",
        body: JSON.stringify({ task: { ...task, isCompleted: true } }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (!responseData) throw new Error("Failed to delete the task!");
    }
  };

  return (
    <>
      {openModal && (
        <Modal type={action} closeModal={hideModal} onConfirm={handleTask} />
      )}
      <Card className={task.priority}>
        <li className={styles.task}>
          <div className={styles.taskInfo}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className={styles.taskActions}>
            <p onClick={() => showModal("delete")}>
              <GoTrash size={30} />
            </p>
            <input type="checkbox" onClick={() => showModal("complete")} />
          </div>
        </li>
      </Card>
    </>
  );
};

export default Task;
