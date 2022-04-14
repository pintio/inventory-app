import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/api/get/allSuppliers", (req, res) => {
  pool
    .query(`SELLECT * FROM suppliers`)
    .then((q_res) => res.send(q_res.rows))
    .catch((err) => console.log(err));
});

router.post("api/add/supplier/:suppName", (req, res) => {
  pool
    .query(`INSERT INTO suppliers(supplier_name) VALUES($1) RETURNING *`, [
      req.params.suppName,
    ])
    .then((q_res) => res.send(q_res.rows[0]))
    .catch((err) => console.log(err));
});
