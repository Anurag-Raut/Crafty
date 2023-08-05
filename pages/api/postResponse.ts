const { connectToDatabase } = require("@/db");
import mongoose from 'mongoose'; 
import ResponsesArray from '@/models/response/responseArray';
import TextResponse from '@/models/response/textResponse';
import ClozeResponse from '@/models/response/clozeResponse';
import McqResponse from '@/models/response/mcqResponse';
import CategorizeResponse from '@/models/response/categoriesResponse';
import ComprehensionResponse from '@/models/response/comprehensionResponse';
// const {ResponsesArray,TextResponse,McqResponse,ComprehensionResponse,ClozeResponse,CategorizeResponse} =require('../../models/responses')
export default async function handler(req, res) {
//   const client = await clientPromise;
await mongoose.connect('mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/crafty?retryWrites=true&w=majority', {
 
});
//   console.log(db)
  switch (req.method) {
    case "POST":

    try{
        let {document,id} = (req.body)
        console.log(document)
       
        let arr=[]
   

          document.map((response)=>{
            if(response.type==='text'){
                const newRes=response;
                delete newRes.key;
                delete newRes.index;
                arr.push(new TextResponse(newRes))
            }
            else if(response.type==='mcq'){
                const newRes=response;
                delete newRes.key;
                delete newRes.index;
                arr.push(new McqResponse(newRes))
            }
            else if(response.type==='categorize'){
                const newRes=response;
                delete newRes.key;
                delete newRes.index;
                delete newRes.bag;
                arr.push(new CategorizeResponse(newRes))
            }
            else if(response.type==='cloze'){
                const newRes=response;
                delete newRes.key;
                delete newRes.index;
                delete newRes.bag;
                arr.push(new ClozeResponse(newRes))
            }
            else if(response.type==='comprehension'){
                const newRes=response;
                delete newRes.key;
                delete newRes.index;
                arr.push(new ComprehensionResponse(newRes))
            }
          })
          const newResponsesArray=new ResponsesArray({responses:arr,formID:id});
  
        await newResponsesArray.save();
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
