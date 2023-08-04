

import mongoose from 'mongoose';

const TextQuestionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
 

  type: {
    type: String,
    default: 'text',
    enum: ['text'],
    required: true
  },
  answer:{
    type:String,

  }
}, );

const TextResponse =  mongoose.model('TextResponse', TextQuestionSchema);

export default TextResponse;
