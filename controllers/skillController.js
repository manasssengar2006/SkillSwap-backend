import Skill from "../models/Skill.js";


/*
CREATE SKILL
Seller creates a new skill listing
*/

export const createSkill = async (req, res) => {

try {

const { title, description, price, category } = req.body;

const skill = await Skill.create({
title,
description,
price,
category,
seller: req.user.id
});

res.status(201).json(skill);

} catch (error) {

res.status(500).json({
message: "Failed to create skill",
error: error.message
});

}

};



/*
GET ALL SKILLS
Used for marketplace browse page
*/

export const getSkills = async (req, res) => {

try {

const skills = await Skill
.find()
.populate("seller", "name email");

res.json(skills);

} catch (error) {

res.status(500).json({
message: "Failed to fetch skills",
error: error.message
});

}

};



/*
GET SINGLE SKILL
Used for skill detail page
*/

export const getSkillById = async (req, res) => {

try {

const skill = await Skill
.findById(req.params.id)
.populate("seller", "name email");

if (!skill) {
return res.status(404).json({ message: "Skill not found" });
}

res.json(skill);

} catch (error) {

res.status(500).json({
message: "Error fetching skill",
error: error.message
});

}

};



/*
GET SELLER SKILLS
Used in seller dashboard
*/

export const getSellerSkills = async (req, res) => {

try {

const skills = await Skill.find({
seller: req.user.id
});

res.json(skills);

} catch (error) {

res.status(500).json({
message: "Failed to fetch seller skills",
error: error.message
});

}

};



/*
UPDATE SKILL
Seller edits their listing
*/

export const updateSkill = async (req, res) => {

try {

const skill = await Skill.findById(req.params.id);

if (!skill) {
return res.status(404).json({ message: "Skill not found" });
}

if (skill.seller.toString() !== req.user.id) {
return res.status(403).json({
message: "Not authorized"
});
}

const updatedSkill = await Skill.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

res.json(updatedSkill);

} catch (error) {

res.status(500).json({
message: "Failed to update skill",
error: error.message
});

}

};



/*
DELETE SKILL
Seller removes their listing
*/

export const deleteSkill = async (req, res) => {

try {

const skill = await Skill.findById(req.params.id);

if (!skill) {
return res.status(404).json({ message: "Skill not found" });
}

if (skill.seller.toString() !== req.user.id) {
return res.status(403).json({
message: "Not authorized"
});
}

await skill.deleteOne();

res.json({
message: "Skill deleted successfully"
});

} catch (error) {

res.status(500).json({
message: "Failed to delete skill",
error: error.message
});

}

};