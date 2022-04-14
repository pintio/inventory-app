import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/api/get/allMaterials", (req, res) => {
  pool.query(`SELECT * FROM materials`, (q_err, q_res) => {
    console.log(q_res.rows);
    res.json(q_res.rows);
  });
});

// router.post("/api/post/material", (req, res) => {
//     pool.query('INSERT INTO materials VALUES')
// });

module.exports = router;
