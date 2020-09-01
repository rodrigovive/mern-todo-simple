const express = require("express");
const router = express.Router();

router.get("/todo", async (req, res) => {
  return res.json({ test: 123 });
});

module.exports = router;
