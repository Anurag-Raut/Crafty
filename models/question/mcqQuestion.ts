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
    type: [{}],
    required: true
  },
 
}, { strict: false });

const McqQuestion = mongoose.models.McqQuestion||  mongoose.model('McqQuestion', McqQuestionSchema);

export default McqQuestion;
