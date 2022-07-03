import express from "express";
import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/supplierColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "supplier_name", type: "text" },
  ];
  res.send(columnArr);
});

router.get("/api/get/allSuppliers", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("suppliers").select("*");
    if (!error) res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/add/supplier/:suppName", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("suppliers")
      .insert({ supplier_name: req.params.suppName });
    if (error) {
      console.log(error);
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/delete/supplier/:suppId", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("suppliers")
      .delete()
      .match({ s_id: req.params.suppId });
    if (error) console.log(error);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
