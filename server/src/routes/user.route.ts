import express, { Request } from "express";
import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/userColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "user_name", type: "text" },
    { column_name: "full_name", type: "text" },
    { column_name: "position", type: "text" },
    { column_name: "joining_date", type: "text" },
  ];
  res.send(columnArr);
});

router.get("/api/get/allUsers", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("users").select("*");
    if (!error) res.send(data);
    if (error) console.log(error, "user route 1");
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/api/add/user/:username&:fullname&:position",
  async (
    req: Request<{ username: string; fullname: string; position: string }>,
    res
  ) => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    console.log(today);
    try {
      const { data, error } = await psqlDb.from("users").insert({
        user_name: req.params.username,
        full_name: req.params.fullname,
        position: req.params.position,
        joining_date: today,
      });
      // res.send();
      if (error) {
        console.log(error, "user route 2");
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
    }
  }
);

router.delete(
  "/api/delete/user/:userId",
  async (req: Request<{ userId: number }>, res) => {
    try {
      const { data, error } = await psqlDb
        .from("users")
        .delete()
        .match({ user_id: req.params.userId });

      if (error) console.log(error, "user route 3");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
