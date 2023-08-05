const { connectToDatabase } = require("@/db");
import mongoose from 'mongoose'; 
import ResponsesArray from '@/models/response/responseArray';
import QuestionsArray from '@/models/question/questions';

export default async function handler(req, res) {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/crafty?retryWrites=true&w=majority', {
  
});
    try {

      const { userId } = req.body; 
      console.log(userId,'useerrrr')
      
  

    
  

      const results = await QuestionsArray.find({ userId });
  
      if (results.length === 0) {
        return res.status(400).json({ error: 'No records found for the user' });
      }
  
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Make sure to close the database connection after the operation
      mongoose.disconnect();
    }
  }