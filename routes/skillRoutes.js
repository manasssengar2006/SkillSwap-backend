import express from "express";
import auth from "../middleware/authMiddleware.js";

import {
createSkill,
getSkills,
getSkillById,
getSellerSkills,
updateSkill,
deleteSkill
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", getSkillById);

router.post("/", auth, createSkill);
router.get("/seller/my-skills", auth, getSellerSkills);

router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

export default router;