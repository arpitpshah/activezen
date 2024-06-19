import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  benefits: { type: String, required: true },
  successStories: { type: String, required: true },
  resources: [{ type: String }],
}, {
  timestamps: true,
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
