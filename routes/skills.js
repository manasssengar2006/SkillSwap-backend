import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

/* CREATE SKILL */
router.post("/", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL SKILLS */
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;