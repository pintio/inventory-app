import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/api/get/allCategories", (req, res) => {
  pool
    .query(`SELECT * FROM categories`)
    .then((q_res) => res.send(q_res.rows))
    .catch((err) => console.log(err));
});

router.post("api/add/category/:catName", (req, res) => {
  console.log("lololo");
  pool
    .query(`INSERT INTO categories(category_name) VALUES($1) RETURNING *`, [
      req.params.catName,
    ])
    .then((q_res) => res.send(q_res.rows[0]))
    .catch((err) => console.log(err));
});

module.exports = router;
