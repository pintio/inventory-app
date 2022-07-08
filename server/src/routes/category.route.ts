import express, { Request } from "express";
import psqlDb from "../db";

const router = express.Router();

// to get column names and types
router.get("/api/get/categoriesColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "category_name", type: "text" },
  ];
  res.send(columnArr);
});

// to get all categories
router.get("/api/get/allCategories", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("categories").select("*");
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

// to get only one category matching the id
router.get(
  "/api/get/category/:id",
  async (req: Request<{ id: number }>, res) => {
    try {
      const { data, error } = await psqlDb
        .from("categories")
        .select("*")
        .match({ cat_id: req.params.id });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }
);

router.post("/api/add/category/:catName", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("categories")
      .insert({ category_name: req.params.catName });
    // res.send(data);
    if (error) {
      console.log(error);
      return;
    }
    res.status(204).send();
  } catch (e) {
    console.log(e);
  }
});

router.delete("/api/delete/category/:catId", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("categories")
      .delete()
      .match({ cat_id: req.params.catId });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
  // finally {
  //   const { data, error } = await psqlDb.rpc("reset_seq()");
  //   console.log(data, error);
  // }
});

module.exports = router;
