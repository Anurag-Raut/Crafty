import { useState } from "react";
import Card from "../card/cards";
import InputText from "../inputText";
import Select from "../select";


interface Question{
    description:string,
    marks?:number,
    type:'text'|'mcq'|'categorize'|'cloze'|'comprehension',


}
const types=[
    'text','mcq','categorize','cloze','comprehension'

]


export default function Comprehension (){
    const [questions,setQuestons]=useState<Question[]>([])

    return(

       <Card>

        <InputText placeholder="Enter description text" label="Description"/>
        <InputText placeholder="Enter comprehension Text" label="Comprehension" />
        <div className="flex items-center" >
            <p>Type of Question </p>
            <Select options={types}  />
        </div>




        </Card>

    )


}