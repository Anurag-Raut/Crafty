import mongoose from 'mongoose';

const ClozeQuestionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },


  type: {
    type: String,
    default: 'cloze',
    enum: ['cloze'],
    required: true
  },

  spaces: {
    type: [],
    required: true
  }
}, {strict:false} );

const ClozeResponse = mongoose.models.ClozeQuestion|| mongoose.model('ClozeResponse', ClozeQuestionSchema);

export default ClozeResponse;
