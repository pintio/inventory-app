import dotenv from "dotenv";
import express from "express";
import register from "./src/routes/index.route";
import bodyParser from "body-parser";

// dotenv.config();
dotenv.config({ path: __dirname + "/.env" });

const psqlDb = require("./src/db");
console.log(psqlDb);

// const materialRouter = require("./src/routes/material.route");
// const supplierRouter = require("./src/routes/supplier.route");
// const userRouter = require("./src/routes/user.route");
// const warehouseRouter = require("./src/routes/warehouse.route");
// const categoryRouter = require("./src/routes/category.route");

const port = process.env.PORT || 5555;

const app = express();

app.use(bodyParser.json());

register(app);
// app.use("/", materialRouter);
// app.use("/", supplierRouter);
// app.use("/", userRouter);
// app.use("/", warehouseRouter);
// app.use("/", materialRouter);
// app.use("/", categoryRouter);

app.listen(port, () => {});
