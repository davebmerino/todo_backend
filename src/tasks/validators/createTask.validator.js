const { body } = require("express-validator");

const createTaskValidator = [
  body("title", "The title cannot be blank").notEmpty(),
  body("title", "The title must be a string value").isString(),
  body("title", "The title must be at most 100 characters long").isLength({
    max: 100,
  }),
  body("dueDate", "dueDate needs to be valid ISO8601 date string")
    .notEmpty()
    .isISO8601(),
  body(
    "description",
    "The description cannot be empty and must be a string value",
  )
    .notEmpty()
    .isString()
    .trim(),
  body(
    "description",
    "The description cannot be more than 500 characters.",
  ).isLength({ max: 500 }),
  body(
    "status",
    "The status must be one of ['todo', 'inProgress', 'done']",
  ).isIn(["todo", "inProgress", "done"]),
  body(
    "priority",
    "The priority must be one of ['low', 'moderate', 'high']",
  ).isIn(["low", "moderate", "high"]),
];

module.exports = createTaskValidator;
