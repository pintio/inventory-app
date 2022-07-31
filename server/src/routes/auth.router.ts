import express, { Request } from "express";

import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/authColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "email_id", type: "email" },
    { column_name: "password", type: "password" },
  ];

  res.send(columnArr);
});

router.post("/api/auth/signup", async (req, res) => {
  const { user, session, error } = await psqlDb.auth.signUp({
    email: req.body.email_id,
    password: req.body.password,
  });
  if (!error) {
    res.redirect(200, `/profile-setup/${user?.email}&${user?.id}`);
  } else {
    res.status(401);
    res.send(error);
  }
});

router.post("/lol", async (req, res) => {
  console.log(req.body, "lolollsafadjfn");
  res.send(req.body);
});

module.exports = router;
