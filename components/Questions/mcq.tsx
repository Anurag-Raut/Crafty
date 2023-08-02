import { useHook } from "@/hooks/reduxhook";
import Card from "../card/cards";
import InputText from "../inputText";
import { useState } from "react";
import { Item } from "../item";
const { Reorder, useDragControls } = require("framer-motion")


export default function MCQ({ id,parent }:{parent?:string,id:string}) {
    const { value: description, handleChange: setDescription } = useHook(id, 'description',parent);
    const { value: options, handleChange: setOptions } = useHook(id, 'options',parent);
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text === '') {
            return
        }
        var newOptions = options
        if (!newOptions) {
            newOptions = [{ text, index: 0 }];
        }
        else {
            newOptions = [...options, { text, index: options.length }];
        }
        setOptions(newOptions);
        setText('');
    }


    return (
        <Card>
            <InputText value={description} label='Descipttion' placeholder="descriptoion" onChange={(e) => { setDescription(e.target.value) }} />
            <p>Add options</p>

            <div className="flex">
                <InputText value={text} onChange={(e) => { setText(e.target.value) }} label="" placeholder="Enter Options" />
                <button onClick={handleAdd}>ADD</button>
            </div>

           <div>
                {
                     options && <Reorder.Group axis="y" className=' w-[full] ' onReorder={setOptions} values={options}>
                     {options?.map((data: any) => (
                         <Item key={data.index} id={data.index} item={data} value={data.text} >
                            {data.text}
                            </Item>
                       
     
                     ))}
                 </Reorder.Group>
                }

           </div>
            
            


        </Card>

    )
}