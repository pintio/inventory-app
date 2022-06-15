import express from "express";
import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/allCategories", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("categories").select("*");
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/api/get/categoriesColumnNames", async (req, res) => {
  // try {
  //   const { data, error } = await psqlDb
  //     .from("information_schema.columns")
  //     .select("column_name , data_type")
  //     .match({ table_name: "categories" });

  //   res.send(data);
  //   if (error) console.error(error);
  //   console.log(data);
  // } catch (error) {
  //   console.log(error, psqlDb.auth.user());
  // }
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "category_name", type: "text" },
  ];
  res.send(columnArr);
});

router.post("/api/add/category/:catName", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("categories")
      .insert({ category_name: req.params.catName });
    // res.send(data);
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
  } finally {
    const { data, error } = await psqlDb.rpc("reset_seq()");
    console.log(data, error);
  }
});

module.exports = router;
