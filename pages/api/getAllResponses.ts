const { connectToDatabase } = require("@/db");
import mongoose from 'mongoose'; 
import ResponsesArray from '@/models/response/responseArray';

export default async function handler(req, res) {
await mongoose.connect('mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/crafty?retryWrites=true&w=majority', {

});



    try {
      const { formId } = req.body; 
      console.log(formId)


    const results = await ResponsesArray.find({ formID:formId });
    console.log(results)

      if (!results) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
}
