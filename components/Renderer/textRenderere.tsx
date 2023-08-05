import { useRenderHook } from "@/hooks/reduxhook"
import InputText from "../inputText"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";
import TextArea from "../textArea";

export default function TextRenderer({descriptionText,id,parent,image}){

    const {value:answer,handleChange:setAnswer}=useRenderHook(id,'answer',parent)
    const dispatch=useDispatch();

    
    useEffect(()=>{
        if(!answer){
            setAnswer('');
        }
        function addType(){
    if(parent){
        dispatch(updateNestedRenderComponents({index:id,parent,key:'type',value:'text'}))
    }
    else{
        dispatch(updateRenderComponents({index:id,key:'type',value:'text'}))
    }

        }
        addType()
        

    },[])

    return (
        <div>

        <label htmlFor="" className="text-lg font-bold ">Description : </label>
                <div className="ml-4">{descriptionText}</div>
                {
                image && <div className="my-2">
                <div className='font-bold text-lg'>Image : </div>

                 <img src={image} className='max-h-[40vh]   border-2 p-5' alt={'image not able to load'} />
            </div>
            }
                <TextArea label={'Enter Answer :'} value={answer} placeholder={"Enter Answer"}  onChange={(e)=>{setAnswer(e.target.value)}} />



        </div>
        

    )
}