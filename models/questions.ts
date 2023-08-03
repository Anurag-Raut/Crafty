const mongoose = require('mongoose');

// Define the schema for each question type



// Define the schema for an array of Question objects
const QuestionsArraySchema = new mongoose.Schema(
  {
  questions: [{ type: mongoose.Schema.Types.Mixed,  required: true}]

  },
  { strict: 'throw' } // Enforce strict validation
);
const QuestionsArray = mongoose.models.QuestionsArray || mongoose.model('QuestionsArray', QuestionsArraySchema);


export default QuestionsArray

