import asyncHandler from 'express-async-handler';
import Skill from '../models/skillModel.js';
import logToCloudWatch from '../utils/cloudwatchLogger.js'; // Adjust the import path as necessary

// @desc    Fetch all skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  try {
    logToCloudWatch('Fetching All Skills Start', {});
    const skills = await Skill.find({});
    logToCloudWatch('All Skills Fetched Successfully', { count: skills.length });
    res.json(skills);
  } catch (error) {
    logToCloudWatch('Error Fetching All Skills', { error: error.message });
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
});

// @desc    Fetch single skill by ID
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = asyncHandler(async (req, res) => {
  try {
    logToCloudWatch('Fetching Skill by ID Start', { id: req.params.id });
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      logToCloudWatch('Skill Fetched Successfully', { id: req.params.id });
      res.json(skill);
    } else {
      logToCloudWatch('Skill Not Found', { id: req.params.id });
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    logToCloudWatch('Error Fetching Skill by ID', { error: error.message, id: req.params.id });
    res.status(500).json({ message: 'Error fetching skill', error: error.message });
  }
});

export { getSkills, getSkillById };
