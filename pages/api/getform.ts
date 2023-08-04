const { connectToDatabase } = require("@/db");
import mongoose from 'mongoose'; 
import QuestionsArray from '@/models/question/questions';

export default async function handler(req, res) {
mongoose.connect('mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/crafty?retryWrites=true&w=majority', {

});
//   console.log(db)


    try {
      const { id } = req.body; // Assuming you pass the iid as a query parameter

      // Query the product by _id
      const result = await QuestionsArray.findById(id);

      if (!result) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
}
