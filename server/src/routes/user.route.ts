import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/api/get/allUsers", (req, res) => {
  pool
    .query(`SELECT * FROM users`)
    .then((q_res) => res.send(q_res.rows))
    .catch((err) => console.log(err));
});

router.post(
  "/api/add/user/:username&:fullname&:position&:joiningDate",
  (req, res) => {
    const today = new Date().getDate;
    pool
      .query(
        `INSERT INTO suppliers(username, fullname, position, joining_date) VALUES($1,$2,$3,$4,$5) RETURNING *`,

        [
          /* @ts-ignore */
          req.params.username /* @ts-ignore */,
          /* @ts-ignore */ req.params.fullname,
          /* @ts-ignore */ req.params.position,
          /* @ts-ignore */ req.params.joining_date,
        ]
      )
      .then((q_res) => res.send(q_res.rows[0]))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
