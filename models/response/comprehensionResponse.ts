import mongoose from 'mongoose';
import ClozeResponse from './clozeResponse';
import CategorizeResponse from './categoriesResponse';
import McqResponse from './mcqResponse';
import TextResponse from './textResponse';


const ComprehensionResponseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'comprehension',
    enum: ['comprehension'],
    required: true
  },
  comprehensionArray: [{
    type:mongoose.Schema.Types.Mixed,
    enum:[ClozeResponse,CategorizeResponse,McqResponse,TextResponse],
  
  }],
  comprehensionText:{
    type:String,
    required:true
  }
}, );

const ComprehensionResponse = mongoose.model('ComprehensionResponse', ComprehensionResponseSchema);

export default ComprehensionResponse;
