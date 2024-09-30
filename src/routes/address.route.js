import Router from "express";
import { postAddress, getAddress } from "../controllers/address.controller.js";

const router = Router();

router.post("/post", postAddress);

router.get("/get", getAddress);

export default router;