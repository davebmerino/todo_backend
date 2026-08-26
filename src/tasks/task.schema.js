const { Schema, model, default: mongoose } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
      trim: true,
      maxLength: [100, "The Max length is 100 characters"],
    },
    description: {
      type: String,
      require: [true, "Description is required"],
      trim: true,
      maxLength: [500, "The Max length is 100 characters"],
    },
    status: {
      type: String,
      require: true,
      enum: ["todo", "inProgress", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      require: [true, "PLease select Priority"],
      enum: ["high", "moderate", "low"],
      default: "low",
    },
    dueDate: {
      type: Date,
      require: [true, "Please sected date"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Task = model("Task", taskSchema);
module.exports = Task;
