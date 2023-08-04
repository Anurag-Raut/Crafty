import { useRenderHook } from "@/hooks/reduxhook"
import InputText from "../inputText"

export default function TextRenderer({descriptionText,id,parent}){

    const {value:answer,handleChange:setAnswer}=useRenderHook(id,'answer',parent)

    return (
        <div>

        <label htmlFor="">description</label>
                <div>{descriptionText}</div>

        <InputText value={answer} placeholder="Enter answer" onChange={(e)=>{setAnswer(e.target.value)}} />


        </div>
        

    )
}