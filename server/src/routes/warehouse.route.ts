import express from "express";
import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/warehousesColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "warehouse_name", type: "text" },
  ];
  res.send(columnArr);
});

router.get("/api/get/allWarehouses", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("warehouses").select("*");
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

router.post("/api/add/warehouse/:whName", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("warehouses")
      .insert({ warehouse_name: req.params.whName });
    if (!error) res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/delete/warehouse/:whId", async (req, res) => {
  try {
    const { data, error } = await psqlDb
      .from("warehouses")
      .delete()
      .match({ w_id: req.params.whId });
  } catch (error) {
    console.log(error, "erro");
  }
});

module.exports = router;
