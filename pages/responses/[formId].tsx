import ClozeRenderer from "@/components/Renderer/clozeRenderer";
import CategoriesResponse from "@/components/Response/categoriesResponse";
import ClozeResponse from "@/components/Response/clozeResponse";
import ComprehensionResponse from "@/components/Response/comprehensionResponse";
import McqResponse from "@/components/Response/mcqRsponse";
import TextResponse from "@/components/Response/textResponse";
import Card from "@/components/card/cards";
import Dropdown from "@/components/dropdown";
import CategorizeResponse from "@/models/response/categoriesResponse";
import ResponseComponent from "../../components/Response/response";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export default function Response(){
    const router =useRouter();
    const {formId}=router.query;
    const [responses,setResponses]=useState([]);

    useEffect(()=>{
        async function fetchResponse(){
            console.log(formId)
            try {
                let res = await fetch("https://crafty-cyan.vercel.app/api/getAllResponses", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body:JSON.stringify({formId:formId})
                  });
                  let result = await res.json();
                  console.log(result)
                  setResponses(result)
            
                console.log('New response array saved successfully.',result);
              } catch (error) {
                console.error('Error saving new question array:', error);
              }
          
        }
        fetchResponse()
    },[formId])

    console.log(responses,'res')




    return (
        <div className=" w-full min-h-screen h-full p-10" >
            <div className="font-bold text-3xl">Form information : </div>
            <div>Form Name : </div>
            <div>Form Id: {formId}</div>
            <div className="divider"></div> 
            <div className="font-bold text-3xl">Responses : </div>
            <div className="divider"></div> 
           {responses?.map((data, index) => (
          <Dropdown key={data._id} label={`Response ${index}`}  >
            <ResponseComponent response={data.responses} />
          </Dropdown>


        ))}

        </div>




    ) 

}