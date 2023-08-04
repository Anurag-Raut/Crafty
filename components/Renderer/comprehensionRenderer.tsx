import { useRenderHook } from "@/hooks/reduxhook"
import { useEffect } from "react"
import ClozeRenderer from "./clozeRenderer";
import CategorizeRenderer from "./categorizeRenderer";
import TextRenderer from "./textRenderere";
import McqRenderer from "./mcqRenderer";
import { useDispatch } from "react-redux";
import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";
import Card from "../card/cards";
import Dropdown from "../dropdown";



export default function ComprehensionRenderer({descriptionText,comprehensionText,comprehension_array,id}){
    const {value:comprehensionArray,handleChange:setComprehensionArray}=useRenderHook(id,'comprehensionArray')
    console.log(comprehensionArray,'abeee');
    const dispatch=useDispatch();
    
    useEffect(()=>{
        function addType(){
  
        dispatch(updateRenderComponents({index:id,key:'type',value:'comprehension'}))
    

        }
        addType()
        

    },[])
    const renderQuestionComponent = (questionType, data) => {
        switch (questionType) {
          case 'cloze':
            return <ClozeRenderer description={data.description} id={data.index} contents={data.text}     parent={id} />;
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
            <label className='text-lg font-bold'>Description : </label>
            <div>{descriptionText}</div>
            <label className='text-lg font-bold'>Comprehension : </label>
            <div>{comprehensionText}</div>
           
            <div>
                {
                   comprehensionArray?.map((data,index) => (
                    
                    <Dropdown index={index+1} >
                  
                    <Card key={data.id}> {/* Make sure to add a unique 'key' prop */}
                      {renderQuestionComponent(data.type, data)}
                    </Card>
                    </Dropdown>
                  ))
                }
            </div>

      
            

        </div>
    )
}