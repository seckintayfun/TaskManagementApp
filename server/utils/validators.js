import { body, param } from "express-validator";

export const idValidator = [param("id").exists().withMessage("ID required!")];

export const createTaskValidator = [
  body("task.title")
    .exists("Title required!")
    .isString()
    .withMessage("Title must be a text!")
    .notEmpty()
    .withMessage("Title cannot be empty!"),
  body("task.description")
    .exists("Description required!")
    .isString()
    .withMessage("Description must be a text!")
    .notEmpty()
    .withMessage("Description cannot be empty!")
    .isLength({ max: 250 })
    .withMessage("Description cannot be longer than 250 characters!"),
  body("task.priority")
    .exists("Priority required!")
    .isString()
    .withMessage("Priority must be a text!")
    .isIn(["High", "Medium", "Low"])
    .withMessage("Priority must be either High, Medium, or Low!"),
];

export const updateTaskValidator = [
  ...idValidator,
  ...createTaskValidator,
  body("task.isCompleted")
    .exists("Completion status required!")
    .isBoolean()
    .withMessage("Completion status must be a logical value!"),
];
