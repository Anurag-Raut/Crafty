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
  text: {
    type: String,
    required: true
  },
  image:{
    type:String,

  },
}, { strict: false });

const ClozeQuestion = mongoose.models.ClozeQuestion|| mongoose.model('ClozeQuestion', ClozeQuestionSchema);

export default ClozeQuestion;
