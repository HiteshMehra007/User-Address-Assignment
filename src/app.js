import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

import express from "express";
import addressRouter from "./routes/address.route.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb"}));

app.use(express.urlencoded({ extended: true }));

app.use("/address", addressRouter);

export { app };