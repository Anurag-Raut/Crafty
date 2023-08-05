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
import Modal from '../components/Modal/Modal'
import InputText from '@/components/inputText'
import AddButton from '@/components/custom-components/Addbutton'
import Preview from '@/components/PreviewComponent'
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
  const [preview, setPreview] = useState(false);

  const [name, setname] = useState('')

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

      <div>
        <div className='absolute top-10 right-10 mt-5'>
          <div className="form-control w-fit">
            <label className="cursor-pointer label w-[100px] flex justify-center w-fit">
              <span className="label-text font-bold text-lg ">Preview</span>
              <input type="checkbox" onChange={(e) => { setPreview(e.target.checked) }} className="toggle toggle-primary ml-5" />
            </label>
          </div>
          
        </div>

        {
          !preview ?

            <main
              className={`flex w-full min-h-screen min-w-200 flex-col items-center justify-center p-24 ${inter.className}`}
            >

              <Card color={'base-100'}>
                <Select onChange={(e) => setType(e.target.value)} options={types} />
                <AddButton onClick={() => handleAddItem(type, 0)}  >
                  Add Question</AddButton>
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


                <Modal onClick={async () => {
                  try {
                    await submit(questions, user.sub, name);
                    console.log('done')
                    document.getElementById('my_modal_3').classList.remove('modal-open')
                  }
                  catch (error) {
                    console.error(error);

                  }
                }

                } >
                  <InputText label='Enter Name of the Form' placeholder='Name..' onChange={(e) => { setname(e.target.value) }} />

                </Modal>

              </Card>




            </main>
            :
            <Preview questions={questions} />

        }
      </div>


      : null
  )
}
