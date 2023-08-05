const { connectToDatabase } = require("@/db");
import mongoose from 'mongoose'; 
import QuestionsArray from '@/models/question/questions';
import TextQuestion from '@/models/question/textQuestion';
import ClozeQuestion from '@/models/question/clozeQuestion';
import McqQuestion from '@/models/question/mcqQuestion';
import CategorizeQuestion from '@/models/question/categorizeQuestion';
import ComprehensionQuestion from '@/models/question/comprehensionQuestion';
// const {QuestionsArray,TextQuestion,McqQuestion,ComprehensionQuestion,ClozeQuestion,CategorizeQuestion} =require('../../models/questions')
export default async function handler(req, res) {
//   const client = await clientPromise;
await mongoose.connect('mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/crafty?retryWrites=true&w=majority', {
 
});
//   console.log(db)
  switch (req.method) {
    case "POST":

    try{
        let {document,userId,name} = (req.body)
        console.log(document)


        let arr=[]
 

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
          const newQuestionsArray=new QuestionsArray({questions:arr,userId:userId,name:name});
  
        await newQuestionsArray.save();
        res.json({message:'done'});

    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
    finally{
      mongoose.disconnect()
    }
     
      break;
    case "GET":
    
      res.json({ status: 200, data: 'hello' });
      break;
  }
}
