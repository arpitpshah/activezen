import express from 'express';
import { getSkills, getSkillById } from '../controllers/skillController.js';

const router = express.Router();

router.route('/').get(getSkills);
router.route('/:id').get(getSkillById);

export default router;
