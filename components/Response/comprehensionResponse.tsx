

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



export default function ComprehensionResponse({ descriptionText, comprehensionText, comprehension_array,image }) {
    

    const renderQuestionComponent = (questionType, data) => {
        switch (questionType) {
            case 'cloze':
                return <ClozeResponse image={data?.image} description={data.description} spaces={data.spaces} />;
            case 'categorize':
                return (
                    <CategoriesResponse image={data?.image}
                        lists={data.lists}

                    />
                );
            case 'mcq':
                return <McqResponse image={data?.image} options={data.options} description={data.description} />
            case 'text':
                return <TextResponse image={data?.image} answer={data.answer} description={data.description} />

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
            {
                image && <div className="my-2">
                <div className='font-bold text-lg'>Image : </div>

                 <img src={image} className='max-h-[40vh]   border-2 p-5' alt={'image not able to load'} />
            </div>
            }

            <div>
                {
                    comprehension_array?.map((data, index) => (

                        <Dropdown label={`Question ${index + 1}`} >

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