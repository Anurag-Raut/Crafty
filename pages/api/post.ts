const { connectToDatabase } = require("@/db");
import mongoose from 'mongoose'; 
import QuestionsArray from '@/models/questions';
import TextQuestion from '@/models/textQuestion';
import ClozeQuestion from '@/models/clozeQuestion';
import McqQuestion from '@/models/mcqQuestion';
import CategorizeQuestion from '@/models/categorizeQuestion';
import ComprehensionQuestion from '@/models/comprehensionQuestion';
// const {QuestionsArray,TextQuestion,McqQuestion,ComprehensionQuestion,ClozeQuestion,CategorizeQuestion} =require('../../models/questions')
export default async function handler(req, res) {
//   const client = await clientPromise;
mongoose.connect('mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/crafty?retryWrites=true&w=majority', {
 
});
//   console.log(db)
  switch (req.method) {
    case "POST":

    try{
        let {document} = (req.body)
        console.log()
        // const newPost = new QuestionsArray({
        //   questions:bodyObject.document
        // });

        let arr=[]
    //    document =  [
    //         {
    //           description: 'What is your favorite color?',
    //           type: 'text',
    //         },
    //         {
    //           description: 'Which fruit do you like the most?',
    //           type: 'mcq',
    //           options: ['Apple', 'Banana', 'Orange', 'Mango'],
    //           answers: ['Apple', 'Mango'],
    //         },
    //         // Add more questions here
    //       ]

          document.map((question)=>{
            if(question.type==='text'){
                arr.push(new TextQuestion(question))
            }
            else if(question.type==='mcq'){
                arr.push(new McqQuestion(question))
            }
            else if(question.type==='categorize'){
                arr.push(new CategorizeQuestion(question))
            }
            else if(question.type==='cloze'){
                arr.push(new ClozeQuestion(question))
            }
            else if(question.type==='comprehension'){
                arr.push(new ComprehensionQuestion(question))
            }
          })
          const newQuestionsArray=new QuestionsArray({questions:arr});
  
        await newQuestionsArray.save();
        res.json({message:'done'});

    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
     
      break;
    case "GET":
    
      res.json({ status: 200, data: 'hello' });
      break;
  }
}
