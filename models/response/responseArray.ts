import CategorizeResponse from "./categoriesResponse";
import ClozeResponse from "./clozeResponse";
import ComprehensionResponse from "./comprehensionResponse";
import McqResponse from "./mcqResponse";
import TextResponse from "./textResponse";

const mongoose = require('mongoose');

// Define the schema for each question type



// Define the schema for an array of Response objects
const ResponsesArraySchema = new mongoose.Schema(
  {
  response: [{ type: mongoose.Schema.Types.Mixed,
    enum:[ClozeResponse,CategorizeResponse,McqResponse,TextResponse,ComprehensionResponse],
      
    required: true}],

    formID: {
        type:String,
        required:true
      },
      image:{
        type:String,
     }

  },
  {strict:false}
  
 
);
const ResponsesArray = mongoose.models.ResponsesArray || mongoose.model('ResponsesArray', ResponsesArraySchema);


export default ResponsesArray

