import { useRenderHook } from "@/hooks/reduxhook"
import { useEffect } from "react"
import ClozeRenderer from "./clozeRenderer";
import CategorizeRenderer from "./categorizeRenderer";
import TextRenderer from "./textRenderere";
import McqRenderer from "./mcqRenderer";



export default function ComprehensionRenderer({descriptionText,comprehensionText,comprehension_array,id}){
    const {value:comprehensionArray,handleChange:setComprehensionArray}=useRenderHook(id,'comprehensionArray')
    console.log(comprehensionArray,'abeee');
    const renderQuestionComponent = (questionType, data) => {
        switch (questionType) {
          case 'cloze':
            return <ClozeRenderer id={data.index} contents={data.text}     parent={id} />;
          case 'categorize':
            return (
              <CategorizeRenderer
                categories={data.categories}
                categoriesItems={data.categoriesItems}
                id={data.index}
                parent={id}
              />
            );
          case 'mcq':
            return <McqRenderer     parent={id} id={data.index} options={data.options} description={data.description}/>  
          case 'text':
            return <TextRenderer     parent={id} id={data.index} descriptionText={data.description} />
                   // Add cases for other question types here
          default:
            return null;
        }
      };
    useEffect(()=>{
        if(comprehensionArray){
            // return;
        }

        setComprehensionArray(comprehension_array)
    },[])
    return (
        <div>
            <div>{descriptionText}</div>
            <div>{comprehensionText}</div>
            <div>
                {
                    comprehensionArray?.map((data)=>{
                        return renderQuestionComponent(data.type,data)

                    })
                }
            </div>

        </div>
    )
}