const { query } = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid integer")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("limit").customSanitizer((value, { req }) => {
    return value ? value : 5;
  }),
  query("page", "page must be a valid integer and greater than or equal to 1")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("page").customSanitizer((value, { req }) => {
    return value ? value : 1;
  }),
  query("order", "order must be one of ['asc', 'dsc']")
    .optional()
    .isIn(["asc", "dsc"]),
  query("order").customSanitizer((value, { req }) => {
    return value ? value : "asc";
  }),
];

module.exports = getTasksValidator;
