import ClozeRenderer from "@/components/Renderer/clozeRenderer";
import CategoriesResponse from "@/components/Response/categoriesResponse";
import ClozeResponse from "@/components/Response/clozeResponse";
import ComprehensionResponse from "@/components/Response/comprehensionResponse";
import McqResponse from "@/components/Response/mcqRsponse";
import TextResponse from "@/components/Response/textResponse";
import Card from "@/components/card/cards";
import CategorizeResponse from "@/models/response/categoriesResponse";

import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export default function Response(){
    const router =useRouter();
    const {id}=router.query;
    const [response,setResponse]=useState([]);

    useEffect(()=>{
        async function fetchResponse(){
            try {
                let res = await fetch("http://localhost:3000/api/getResponse", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body:JSON.stringify({id:id})
                  });
                  let result = await res.json();
                  setResponse(result.responses)
            
                console.log('New response array saved successfully.',result);
              } catch (error) {
                console.error('Error saving new question array:', error);
              }
          
        }
        fetchResponse()
    },[id])



    const renderQuestionComponent = (questionType, data) => {
        switch (questionType) {
          case 'cloze':
            return <ClozeResponse image={data?.image} description={data.description} spaces={data.spaces} />;
          case 'categorize':
            return (
              <CategoriesResponse image={data?.image}
            lists={data.lists}/>
            )
 
          case 'mcq':
            return <McqResponse image={data?.image} options={data.options} description={data.description}/>  
          case 'text':
            return <TextResponse image={data?.image} description={data.description} answer={data.answer} />
          case 'comprehension':
             return <ComprehensionResponse image={data?.image}  descriptionText={data.description} comprehensionText={data.comprehensionText} comprehension_array={data.comprehensionArray} />
     
          default:
            return null;
        }
      };

    return (
        <div>
           {response?.map((data, index) => (
          <Card key={index}>
            {renderQuestionComponent(data.type, data)}
          </Card>


        ))}

        </div>




    ) 

}