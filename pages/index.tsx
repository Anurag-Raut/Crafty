import Image from 'next/image'
import { Inter, Julee } from 'next/font/google'
import Categorize from '../components/Questions/categorize'
import Cloze from '@/components/Questions/cloze'
import Comprehension from '@/components/Questions/comprehension'
import { useEffect, useState } from 'react'
import { addQuestion, updateItem } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import Select from '@/components/select'
import {useIsMounted} from 'usehooks-ts'
import Text from '@/components/Questions/text'
import MCQ from '@/components/Questions/mcq'
import uniqid from 'uniqid';
import { Item } from '@/components/item'
const { Reorder } = require('framer-motion')
const inter = Inter({ subsets: ['latin'] })
interface Question{
  description:string,
  marks?:number,
  type:'text'|'mcq'|'categorize'|'cloze'|'comprehension',


}
const types:string[]=['text','mcq','categorize','cloze','comprehension'];
interface TextQuestion{
  description:string,
  minWordLimit:number
  maxWordLimit:number
}
interface mcqQuestion{
  description:string,
  options:string[],
  answers:string[],
}
interface ClozeQuestion{
  description:string,
  underlinedContents:{}[]
  contents:string
}
interface CategorizeQuestion{
  description:string,
  categories:string[]
  categoriesItems:{}[]
}
interface ComprehensionQuestion{
  description:string,
  questions:Question[]
}
export default function Home() {
 const [mounted,setMounted]=useState(0);
  const dispatch = useDispatch();
  const [type,setType]=useState('text');
  
  useEffect(() => {
    setMounted(1) // Initialize the type on the client side
  }, []);

  
  const renderQuestionComponent = (questionType, questionId:string) => {
    switch (questionType) {
        case 'cloze':
            return <Cloze id={questionId}  />;

        case 'mcq':
            return <MCQ id={questionId} />;
        case 'text':
            return <Text id={questionId} />
        case 'categorize':
          return <Categorize id={questionId} />
        
        default:
            return null;
    }
};


  const handleAddItem = (index) => {
    let id=uniqid();
    dispatch(addQuestion({ index:id,type }));
  };
  
  const questions = useSelector((state:any) => state.Questions);
  const update = (index, key, value) => {
    dispatch(updateItem({ index, key, value }));
  };
  const [q,setQ]=useState([])

  console.log(questions,'yfyu')
  return (
    mounted?
    <main
      className={`flex min-h-screen min-w-200 flex-col items-center justify-between p-24 ${inter.className}`}
    >
        <Select onChange={(e)=>setType(e.target.value)} options={types} />
      <button onClick={()=>handleAddItem(0)}>Add Item</button> 
      <div>


      {
                    questions && <Reorder.Group axis="y" className=' w-[full] ' onReorder={update} values={questions}>
                        {
                            questions?.map((data) => {
                                return (
                                    
                                    <Item key={data.index} id={data.index} item={data} >
                            
                                        {renderQuestionComponent(data.type, data.index)}
                                    
                                  
                                    </Item>

                                )
                            })
                        }
                    </Reorder.Group>
                }



      </div>
     
     

    </main>
    :null
  )
}
