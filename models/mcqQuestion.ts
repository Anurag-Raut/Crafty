import mongoose from 'mongoose';

const McqQuestionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  index:{
    type: String,
    required: true
  },

  type: {
    type: String,
    default: 'mcq',
    enum: ['mcq'],
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  answers: {
    type: [String],
    required: true
  }
}, { strict: 'throw' });

const McqQuestion = mongoose.model('McqQuestion', McqQuestionSchema);

export default McqQuestion;
