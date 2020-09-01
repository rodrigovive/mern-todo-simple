const { v4: uuidv4 } = require("uuid");
const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ success: true, data: todos });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      success: false,
    });
  }
};

const addTodo = async (req, res) => {
  const {
    body: { text },
  } = req;
  const newTodo = new Todo({ text, id: uuidv4() });
  try {
    const todo = await newTodo.save();
    return res.status(201).json({ data: todo, success: true });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      success: false,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const todo = await Todo.findOne({ id });
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "todo not found",
      });
    }
    await todo.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
};
