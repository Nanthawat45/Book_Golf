import express from "express";
import { addEquipment, seedEquipment, updateEquipment} from "../controllers/bookingController.js";
const router = express.Router();

router.post("/add", addEquipment);
router.post("/seed", seedEquipment);
router.put("/update", updateEquipment);

export default router;
