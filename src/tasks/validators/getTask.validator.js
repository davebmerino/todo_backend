const { query } = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid integer between 1 and 100")
    .optional()
    .isInt({ min: 1, max: 100 }) // bounds belong on isInt(), not toInt() — toInt() only converts
    .toInt(),
  query("limit").customSanitizer((value) => (value ? value : 5)),

  query("page", "page must be a valid integer greater than or equal to 1")
    .optional()
    .isInt({ min: 1 })
    .toInt(),
  query("page").customSanitizer((value) => (value ? value : 1)),

  query("order", "order must be one of ['asc', 'dsc']")
    .optional()
    .isIn(["asc", "dsc"]),
  query("order").customSanitizer((value) => (value ? value : "asc")),

  query("status", "status must be one of ['todo', 'inProgress', 'done']")
    .optional()
    .isIn(["todo", "inProgress", "done"]),

  query("priority", "priority must be one of ['low', 'moderate', 'high']")
    .optional()
    .isIn(["low", "moderate", "high"]),

  query("search", "search must be a string up to 100 characters")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }),
];

module.exports = getTasksValidator;
