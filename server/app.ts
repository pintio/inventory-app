import dotenv from "dotenv";
import express from "express";
import register from "./src/routes/index.route";

dotenv.config();

const materialRouter = require("./src/routes/material.route");

const port = process.env.PORT || 5555;

const app = express();

register(app);
app.use("/", materialRouter);
app.listen(port, () => {});
