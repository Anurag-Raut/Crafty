import mongoose from 'mongoose';

const CategorizeQuestionSchema = new mongoose.Schema({
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
  index:{
    type: String,
    required: true
  },

  categories: {
    type: [String],
    required: true
  },
  categoriesItems: [{}] // Define the schema for this property as needed
}, { strict: 'throw' });

const CategorizeQuestion = mongoose.model('CategorizeQuestion', CategorizeQuestionSchema);

export default CategorizeQuestion;
