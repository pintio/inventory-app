import express, { Request } from "express";
import psqlDb from "../db";

const router = express.Router();

router.get("/api/get/materialsColumnNames", async (req, res) => {
  const columnArr: { column_name: string; type: string }[] = [
    { column_name: "serial_number", type: "number" },
    { column_name: "material_name", type: "string" },
    { column_name: "last_update", type: "date" },
    { column_name: "category", type: "number" },
    { column_name: "warehouse", type: "number" },
    { column_name: "supplier", type: "number" },
    { column_name: "receiver", type: "number" },
  ];
  res.send(columnArr);
});

router.get("/api/get/allMaterials", async (req, res) => {
  try {
    const { data, error } = await psqlDb.from("materials").select("*");
    if (error) {
      console.log(error, "stock route");
      return;
    }
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/api/add/material/:materialname&:categoryid&:warehouseid&:supplierid&:receivedby",
  async (
    req: Request<{
      materialname: string;
      categoryid: number;
      warehouseid: number;
      supplierid: number;
      receivedby: number;
    }>,
    res
  ) => {
    try {
      const date = new Date();
      const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const { data, error } = await psqlDb.from("materials").insert({
        material_name: req.params.materialname,
        last_update: today,
        category_id: req.params.categoryid,
        warehouse_id: req.params.warehouseid,
        supplier_id: req.params.supplierid,
        received_by: req.params.receivedby,
      });
      if (error) {
        console.log(error);
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
    }
  }
);

router.delete(
  "/api/delete/material/:materialid",
  async (req: Request<{ materialid: number }>, res) => {
    try {
      const { data, error } = await psqlDb
        .from("materials")
        .delete()
        .match({ m_id: req.params.materialid });
      if (error) {
        console.log(error);
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
