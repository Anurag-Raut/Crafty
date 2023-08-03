import mongoose from 'mongoose';

const ClozeQuestionSchema = new mongoose.Schema({
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
    default: 'cloze',
    enum: ['cloze'],
    required: true
  },
  underlinedContents: [{}], // Define the schema for this property as needed
  contents: {
    type: String,
    required: true
  }
}, { strict: 'throw' });

const ClozeQuestion = mongoose.model('ClozeQuestion', ClozeQuestionSchema);

export default ClozeQuestion;
