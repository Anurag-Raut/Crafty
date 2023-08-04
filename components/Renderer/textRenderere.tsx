import { useRenderHook } from "@/hooks/reduxhook"
import InputText from "../inputText"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";

export default function TextRenderer({descriptionText,id,parent}){

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

        <label htmlFor="">description</label>
                <div>{descriptionText}</div>

        <InputText value={answer} placeholder="Enter answer" onChange={(e)=>{setAnswer(e.target.value)}} />


        </div>
        

    )
}