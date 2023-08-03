import mongoose from 'mongoose';

const BaseQuestionSchema = new mongoose.Schema({
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
    enum: ['text', 'mcq', 'categorize', 'cloze', 'comprehension'],
    required: true
  }
}, { strict: 'throw' });

const ComprehensionQuestionSchema = new mongoose.Schema({
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
    default: 'comprehension',
    enum: ['comprehension'],
    required: true
  },
  questions_comprehension: {
    type: [BaseQuestionSchema],
    required: true
  },
  comprehensionText:{
    type:String,
    required:true

  }
}, { strict: 'throw' });

const ComprehensionQuestion = mongoose.model('ComprehensionQuestion', ComprehensionQuestionSchema);

export default ComprehensionQuestion;
