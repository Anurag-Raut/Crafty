import Image from 'next/image'
import { Inter, Julee } from 'next/font/google'
import Categorize from '../components/Questions/categorize'
import Cloze from '@/components/Questions/cloze'
import Comprehension from '@/components/Questions/comprehension'
import { useEffect, useState } from 'react'
import { addQuestion, updateItem, updateMainQuestions } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import Select from '@/components/select'
import { useIsMounted } from 'usehooks-ts'
import Text from '@/components/Questions/text'
import MCQ from '@/components/Questions/mcq'
import uniqid from 'uniqid';
import { Item } from '@/components/item'
import { submit } from '@/functions/databseFunctions'
import { addItem } from '@/functions/addItem'
import { useHook } from '@/hooks/reduxhook'
import ClozeRenderer from '@/components/Renderer/clozeRenderer'
import CategorizeRenderer from '@/components/Renderer/categorizeRenderer'
import Card from '@/components/card/cards'
import { useUser } from '@auth0/nextjs-auth0/client'
const { Reorder } = require('framer-motion')
const inter = Inter({ subsets: ['latin'] })
interface Question {
  description: string,
  marks?: number,
  type: 'text' | 'mcq' | 'categorize' | 'cloze' | 'comprehension',


}
const types: string[] = ['text', 'mcq', 'categorize', 'cloze', 'comprehension'];
interface TextQuestion {
  description: string,
  minWordLimit: number
  maxWordLimit: number
}
interface mcqQuestion {
  description: string,
  options: string[],
  answers: string[],
}
interface ClozeQuestion {
  description: string,
  underlinedContents: {}[]
  contents: string
}
interface CategorizeQuestion {
  description: string,
  categories: string[]
  categoriesItems: {}[]
}
interface ComprehensionQuestion {
  description: string,
  questions: Question[]
}
export default function Create() {
  const [mounted, setMounted] = useState(0);
  const dispatch = useDispatch();
  const [type, setType] = useState('text');

  useEffect(() => {
    setMounted(1) // Initialize the type on the client side
  }, []);


  const renderQuestionComponent = (questionType, questionId: string) => {
    switch (questionType) {
      case 'cloze':
        return <Cloze id={questionId} />;

      case 'mcq':
        return <MCQ id={questionId} />;
      case 'text':
        return <Text id={questionId} />
      case 'categorize':
        return <Categorize id={questionId} />
      case 'comprehension':
        return <Comprehension id={questionId} />

      default:
        return null;
    }
  };


  const handleAddItem = (type, index = 0) => {
    let id = uniqid();
    const initialState = addItem(id, type, index);

    dispatch(addQuestion(initialState))

  };
  const questions = useSelector((state: any) => state.Questions);
  const update = (newvalue) => {

    dispatch(updateMainQuestions(newvalue));
  };
  const { user, error, isLoading, } = useUser();
  console.log(user)

  console.log(questions, 'yfyu')
  return (
    mounted ?
      <main
        className={`flex w-full min-h-screen min-w-200 flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <Card color={'base-100'}>
          <Select onChange={(e) => setType(e.target.value)} options={types} />
          <button onClick={() => handleAddItem(type, 0)}>Add Item</button>
          <div>


            {
              questions && <Reorder.Group axis="y" className=' w-full ' onReorder={update} values={questions}>
                {
                  questions?.map((data, index) => {
                    return (

                      <Item pos={index} key={data.index} id={data.index} item={data} card={true} >
                        <div className='w-full'>
                          {renderQuestionComponent(data.type, data.index)}
                        </div>




                      </Item>

                    )
                  })
                }
              </Reorder.Group>
            }



          </div>



          <button onClick={() => { submit(questions,user.sub) }} >Submit</button>
        </Card>

       


      </main>
      : null
  )
}
