import express, { Request } from "express";
import psqlDb from "../db";

const multer = require("multer");

const upload = multer();

const router = express.Router();

router.get("/api/get/userColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "user_name", type: "text" },
    { column_name: "company", type: "text" },
    { column_name: "full_name", type: "text" },
    { column_name: "position", type: "text" },
    { column_name: "joining_date", type: "text" },
  ];
  res.send(columnArr);
});

// to get only one user matching the id
router.get("/api/get/user/:id", async (req: Request<{ id: number }>, res) => {
  try {
    const { data, error } = await psqlDb
      .from("users")
      .select("*")
      .match({ user_id: req.params.id });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
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

// router.post(
//   "/api/add/user/:username&:fullname&:position",
//   async (
//     req: Request<{ username: string; fullname: string; position: string }>,
//     res
//   ) => {
//     const date = new Date();
//     const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

//     try {
//       const { data, error } = await psqlDb.from("users").insert({
//         // user_name: req.params.username,
//         full_name: req.params.fullname,
//         position: req.params.position,
//         joining_date: today,
//       });
//       // res.send();
//       if (error) {
//         console.log(error, "user route 2");
//         return;
//       }
//       res.status(204).send();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

router.post(
  "/api/add/user/:email&:uuid",
  upload.single("logo"),
  async (req: Request<{ email: string; uuid: string }>, res) => {
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    try {
      const { data, error } = await psqlDb.from("users").insert({
        company: req.body.companyname,
        position: req.body.position,
        joining_date: today,
        full_name: req.body.fullname,
        uid: req.params.uuid,
        email: req.params.email,
        address: req.body.address,
      });
    } catch (error) {}

    try {
      const file = req.file as any;

      const { data, error } = await psqlDb.storage
        .from("inventory")
        .upload("public/avatar1.png", file);

      if (error) console.log(error);
      else console.log(data);
    } catch (error) {}
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
