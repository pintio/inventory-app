import express from "express";
import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/userColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "user_name", type: "text" },
    { column_name: "full_name", type: "text" },
    { column_name: "position", type: "text" },
    { column_name: "joining_date", type: "date" },
  ];
  res.send(columnArr);
});

router.get("/api/get/allUsers", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("users").select("*");
    if (error) console.log("supabase error", error);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/add/user/:username&:fullname&:position", async (req, res) => {
  const today = new Date().getDate;

  try {
    const { data, error } = await psqlDb.from("users").insert({
      /* @ts-ignore */
      user_name: req.params.username,
      /* @ts-ignore */
      full_name: req.params.fullname,
      /* @ts-ignore */
      position: req.params.position,
      joining_date: today,
    });

    if (error) console.log(error);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/delete/user/:userId", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("users")
      .delete()
      .match({ user_id: req.params.userId });

    if (error) console.log(error);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
