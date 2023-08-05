import { useHook } from "@/hooks/reduxhook";
import Card from "../card/cards";
import InputText from "../inputText";
import { useEffect } from "react";
import ImageUpload from "../custom-components/ImageUploader";



export default function Text({ id,parent }:{parent?:string,id:string}){
    const {value:description,handleChange:setDescription}=useHook(id,'description',parent)
    const {value:maxLimit,handleChange:setMaxLimit}=useHook(id,'maxLimit',parent);
    const {value:minLimit,handleChange:setMinLimit}=useHook(id,'minLimit',parent);
    const {value:image,handleChange:setImage}=useHook(id,'image',parent);
    useEffect(()=>{
        if(!minLimit){
            setMinLimit(0);
        }
        if(!maxLimit){
            setMaxLimit(0);
        }
    },[])

    return(

        <Card color={'base-300'}  >
            <InputText value={description} label='description' placeholder="descriptoion" onChange={(e)=>{setDescription(e.target.value)}} />
            <ImageUpload fileUrl={image} setFileUrl={setImage} />
            <div className="flex justify-around">
                <InputText value={Number(minLimit)} onChange={(e)=>{setMinLimit(e.target.value)}} type="number" label="Min limit" />
                <InputText value={Number(maxLimit)} onChange={(e)=>{setMaxLimit(e.target.value)}} type="number" label="Max limit" />
            </div>
        </Card>

    )

}