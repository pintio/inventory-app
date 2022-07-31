import { RealtimeSubscription } from "@supabase/supabase-js";
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

// updating material quantity
// data received from the url is string, quantity needs to be converted to the int to manipulate it.
// add error handeling cases - TODO
router.patch(
  "/api/material/:case/:materialId&:quantity",
  async (
    req: Request<{ case: string; materialId: number; quantity: string }>,
    res
  ) => {
    let currentQuantity: number = 0;

    const quantityCalculator = function (): number {
      const quantityAsNumber = parseInt(req.params.quantity);

      let update: number = 0;
      switch (req.params.case) {
        case "receive":
          update = (currentQuantity + quantityAsNumber) as number;
          break;
        case "sell":
          update = (currentQuantity - quantityAsNumber) as number;
          break;
        default:
          break;
      }
      return update;
    };

    try {
      console.log("inn3");
      const { data, error } = await psqlDb
        .from("materials")
        .select("quantity")
        .eq("m_id", req.params.materialId);
      if (!error) {
        console.log(data[0].quantity);
        currentQuantity = data[0].quantity as number;
      } else {
        console.log(error);
        return;
      }
    } catch (err) {
      console.log(err);
    }

    try {
      console.log("inn5");
      const { data, error } = await psqlDb
        .from("materials")
        .update({ quantity: quantityCalculator() })
        .eq("m_id", req.params.materialId);

      if (!error) res.status(204).send();
    } catch (error) {
      console.log(error, "material router update error");
    }
  }
);

module.exports = router;
