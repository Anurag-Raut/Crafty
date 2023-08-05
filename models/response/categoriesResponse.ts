import { strict } from 'assert';
import mongoose from 'mongoose';

const CategorizeResponseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'categorize',
    enum: ['categorize'],
    required: true
  },
 

 lists:{
    type:{},
    required:true,
 }

}, {strict:false});

const CategorizeResponse =  mongoose.models.CategorizeResponse || mongoose.model('CategorizeResponse', CategorizeResponseSchema);

export default CategorizeResponse;
