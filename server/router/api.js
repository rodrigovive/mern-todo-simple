const express = require("express");
const router = express.Router();
const { getTodos, addTodo, deleteTodo } = require("../controllers/todo");

router.route("/todo").get(getTodos).post(addTodo);

router.route("/todo/:id").delete(deleteTodo);

module.exports = router;
