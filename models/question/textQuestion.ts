import mongoose from 'mongoose';

const TextQuestionSchema = new mongoose.Schema({
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
    default: 'text',
    enum: ['text'],
    required: true
  },
  minLimit: {
    type: Number,
    required: true
  },
  maxLimit: {
    type: Number,
    required: true
  },
  image:{
    type:String,

  },
}, { strict: false });

const TextQuestion = mongoose.models.TextQuestion || mongoose.model('TextQuestion', TextQuestionSchema);

export default TextQuestion;
