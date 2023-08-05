import { useState } from "react";
import Card from "../card/cards";
import InputText from "../inputText";
import Select from "../select";
import { useHook } from "@/hooks/reduxhook";
const { Reorder, useDragControls } = require("framer-motion")
import uniqid from 'uniqid';
import Cloze from "./cloze";
import { addQuestion } from "@/redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../item";
import MCQ from "./mcq";
import Text from "./text";
import Categorize from "./categorize";
import AddButton from "../custom-components/Addbutton";
interface Question {
    description: string,
    marks?: number,
    type: 'text' | 'mcq' | 'categorize' | 'cloze' | 'comprehension',


}
const types = [
    'text', 'mcq', 'categorize', 'cloze'

]




export default function Comprehension({ id }) {
    const [selected, setSelected] = useState('text');
    const { value: questions, handleChange: setQuestions } = useHook(id, 'questions_comprehension');
    const { value: description, handleChange: setDescription } = useHook(id, 'description');
    const { value: comprehensionText, handleChange: setComprehensionText } = useHook(id, 'comprehensionText');
    console.log(questions,'questtt');
    const dispatchEvent = useDispatch();

    const renderQuestionComponent = (questionType, questionId) => {
        switch (questionType) {
            case 'cloze':
                return <Cloze id={questionId} parent={id} />;

            case 'mcq':
                return <MCQ id={questionId} parent={id} />;
            case 'text':
                return <Text id={questionId} parent={id} />
            case 'categorize':
                return <Categorize id={questionId} parent={id} />
            
            default:
                return null;
        }
    };

    const handleAddQuestion = () => {

        let idd = uniqid();
        console.log(idd);
        // dispatchEvent(addQuestion({ index: idd, type: selected }));
        console.log(id)
        if (!questions) {
            setQuestions([{ index: idd, type: selected, id: idd }])
        }
        else {
            setQuestions([...questions, { index: idd, type: selected, id: idd }]);
        }

    }

    console.log(questions, selected)


    return (

        <Card color={'base-300'} >
            <div className="w-full">


            <InputText value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Enter description text" label="Description" />
            <InputText value={comprehensionText} onChange={(e) => { setComprehensionText(e.target.value) }} placeholder="Enter comprehension Text" label="Comprehension" />
            <div className="flex justify-between items-center" >
                <p>Type of Question </p>
                <div className="flex">
                <Select onChange={(e) => { setSelected(e.target.value) }} options={types} />
                <AddButton onClick={() =>  handleAddQuestion() }  >
            Add Item</AddButton>
                {/* <button onClick={() => { handleAddQuestion() }} >Add</button> */}

                </div>
              
            </div>

            <div className="w-full">

                {
                    questions && <Reorder.Group axis="y" className='w-full' onReorder={setQuestions} values={questions}  >
                        {
                            questions.map((data,index) => {
                                return (
                                    
                                    <Item card={true} pos={index} parentId={id} comprehension={true} key={data.id} id={data.id} item={data} >
                            
                                        {renderQuestionComponent(data.type, data.id)}
                                    
                                  
                                    </Item>

                                )
                            })
                        }
                    </Reorder.Group>
                }

            </div>

            </div>



        </Card>

    )


}