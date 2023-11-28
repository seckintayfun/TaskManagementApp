import Card from "../Card/Card";
import Button from "../Button/Button";
import { FaRegFlag } from "react-icons/fa";
import styles from "./TaskForm.module.css";
import useValidate from "../../hooks/use-validate";

const TaskForm = () => {
  const {
    value: title,
    valid: isTitleValid,
    error: hasTitleError,
    onChange: onTitleChange,
    onReset: onTitleReset,
  } = useValidate((value) => value.trim().length !== 0);

  const {
    value: description,
    valid: isDescriptionValid,
    error: hasDescriptionError,
    onChange: onDescriptionChange,
    onReset: onDescriptionReset,
  } = useValidate(
    (value) => value.trim().length !== 0 && value.trim().length <= 250
  );

  const {
    value: priority,
    valid: isPriorityValid,
    error: hasPriorityError,
    onChange: onPriorityChange,
    onReset: onPriorityReset,
  } = useValidate(
    (value) =>
      value.trim().length !== 0 && ["High", "Medium", "Low"].includes(value)
  );

  const isFormValid = isTitleValid && isDescriptionValid && isPriorityValid;

  const createTask = async (event) => {
    event.preventDefault();
    const task = {
      title,
      description,
      priority,
    };
    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      body: JSON.stringify({ task: task }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!responseData) throw new Error("Failed to create the task!");
    if (responseData.task) {
      onTitleReset();
      onDescriptionReset();
      onPriorityReset();
    }
  };

  return (
    <Card>
      <form onSubmit={createTask}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" onChange={onTitleChange} />
        </div>
        {hasTitleError && (
          <p className={styles.error}>Title cannot be empty!</p>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={10} onChange={onDescriptionChange} />
        </div>
        {hasDescriptionError && (
          <p className={styles.error}>
            Description cannot be empty or longer than 250 characters!
          </p>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="priority">
            Priority <FaRegFlag />
          </label>
          <select defaultValue={"Medium"} onChange={onPriorityChange}>
            <option key={"High"} value={"High"}>
              High
            </option>
            <option key={"Medium"} value={"Medium"}>
              Medium
            </option>
            <option key={"Low"} value={"Low"}>
              Low
            </option>
          </select>
        </div>
        {hasPriorityError && (
          <p className={styles.error}>
            Priority must be either High, Medium, or Low!
          </p>
        )}
        <div className={styles.formActions}>
          <Button type="submit" className="submit" disabled={!isFormValid}>
            Create
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
