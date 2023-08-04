import mongoose from 'mongoose';
import ClozeQuestion from './clozeQuestion';
import CategorizeQuestion from './categorizeQuestion';
import McqQuestion from './mcqQuestion';
import TextQuestion from './textQuestion';

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
  questions_comprehension: [{
    type:mongoose.Schema.Types.Mixed,
    enum:[ClozeQuestion,CategorizeQuestion,McqQuestion,TextQuestion],
  
  }],
  comprehensionText:{
    type:String,
    required:true

  }
}, { strict: 'throw' });

const ComprehensionQuestion = mongoose.models.ComprehensionQuestion || mongoose.model('ComprehensionQuestion', ComprehensionQuestionSchema);

export default ComprehensionQuestion;
