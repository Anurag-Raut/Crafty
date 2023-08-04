import mongoose from 'mongoose';

const McqQuestionSchema = new mongoose.Schema({
  description: {
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
 
}, );

const McqResponse =   mongoose.model('McqResponse', McqQuestionSchema);

export default McqResponse;
