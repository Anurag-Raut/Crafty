

// import { useRenderHook } from "@/hooks/reduxhook"
// import { useEffect } from "react"

import McqResponse from "./mcqRsponse";
import TextResponse from "./textResponse";
import ClozeResponse from "./clozeResponse";
import CategoriesResponse from "./categoriesResponse";
import Dropdown from "../dropdown";
import Card from "../card/cards";

// import { useDispatch } from "react-redux";
// import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";
// import Card from "../card/cards";
// import Dropdown from "../dropdown";



export default function ComprehensionResponse({descriptionText,comprehensionText,comprehension_array}){
   
    
    const renderQuestionComponent = (questionType, data) => {
        switch (questionType) {
          case 'cloze':
            return <ClozeResponse description={data.description} spaces={data.spaces} />;
          case 'categorize':
            return (
              <CategoriesResponse
                lists={data.lists}
             
              />
            );
          case 'mcq':
            return <McqResponse     options={data.options} description={data.description}/>  
          case 'text':
            return <TextResponse  answer={data.answer}   description={data.description} />
                  
          default:
            return null;
        }
      };
   
    return (
        <div>
            <label className='text-lg font-bold'>Description : </label>
            <div>{descriptionText}</div>
            <label className='text-lg font-bold'>Comprehension : </label>
            <div>{comprehensionText}</div>
           
            <div>
                {
                   comprehension_array?.map((data,index) => (
                    
                    <Dropdown index={index+1} >
                  
                    <Card key={data.id}> 
                      {renderQuestionComponent(data.type, data)}
                    </Card>
                    </Dropdown>
                  ))
                }
            </div>

      
            

        </div>
    )
}