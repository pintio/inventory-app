import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/api/get/allWarehouses", (req, res) => {
  pool
    .query(`SELECT * FROM warehouses`)
    .then((q_res) => res.send(q_res.rows))
    .catch((err) => console.log(err));
});

router.post("api/add/warehouse/:whName", (req, res) => {
  pool
    .query(`INSERT INTO warehouses(warehouse_name) VALUES($1) RETURNING *`, [
      req.params.whName,
    ])
    .then((q_res) => res.send(q_res.rows[0]))
    .catch((err) => console.log(err));
});

module.exports = router;
