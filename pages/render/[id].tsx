import Modal from "@/components/Modal/Modal";
import CategorizeRenderer from "@/components/Renderer/categorizeRenderer";
import ClozeRenderer from "@/components/Renderer/clozeRenderer";
import ComprehensionRenderer from "@/components/Renderer/comprehensionRenderer";
import McqRenderer from "@/components/Renderer/mcqRenderer";
import TextRenderer from "@/components/Renderer/textRenderere";
import Card from "@/components/card/cards";
import InputText from "@/components/inputText";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Render() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  console.log(data);
  const { id } = router.query;
  const response = useSelector((state: any) => state.RenderComponents);
  const submitResponse = () => {

    async function save() {
      try {
        let res = await fetch("https://crafty-cyan.vercel.app/api/postResponse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ document: response, id: id })
        });
        let allPosts = await res.json();

        console.log('New response array saved successfully.', allPosts);
      } catch (error) {
        console.error('Error saving new question array:', error);
      }

    }
    save()

  }

  useEffect(() => {
    if (!id) {
      return;
    }

    const apiUrl = `https://crafty-cyan.vercel.app/api/getform`;

    const requestData = {
      id: id,
      // Other data you want to include in the request body
      // For example: key: value
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [id]);

  const renderQuestionComponent = (questionType, data) => {
    switch (questionType) {
      case 'cloze':
        return <ClozeRenderer image={data?.image} description={data.description} id={data.index} contents={data.text} parent={undefined} />;
      case 'categorize':
        return (
          <CategorizeRenderer
            image={data?.image}
            parent={undefined}
            categories={data.categories}
            categoriesItems={data.categoriesItems}
            id={data.index}
          />
        );
      case 'mcq':
        return <McqRenderer image={data?.image} parent={undefined} id={data.index} options={data.options} description={data.description} />
      case 'text':
        return <TextRenderer image={data?.image} parent={undefined} id={data.index} descriptionText={data.description} />
      case 'comprehension':
        return <ComprehensionRenderer image={data?.image} id={data.index} descriptionText={data.description} comprehensionText={data.comprehensionText} comprehension_array={data.questions_comprehension} />
      // Add cases for other question types here
      default:
        return null;
    }
  };

  return (
    <div className=" p-24 min-h-screen h-full w-full">
      
      <Card>
        <div className="text-xl font-bold"> Form Name : <span>{data.name}</span></div>
        <div className="text-xl font-bold " > Form Id : <span >{data._id}</span> </div>
        <div className="image" ></div>
   
      {
                data['image'] && <div className="my-2">
                <div className='font-bold text-lg'>Image : </div>

                 <img src={ data['image']} className='max-h-[40vh]   border-2 p-5' alt={'image not able to load'} />
            </div>
            }


        {data['questions']?.map((data, index) => (
          <Card key={index}>
            {renderQuestionComponent(data.type, data)}
          </Card>


        ))}

        <Modal onClick={async () => {
          try {
            await submitResponse();
            console.log('done')
            document.getElementById('my_modal_3').classList.remove('modal-open')
          }
          catch (error) {
            console.error(error);

          }
        }

        } >
          <div className="text-xl font-bold mb-3">
            Submit Response
          </div>


        </Modal>


      </Card>
    </div>
  );
}
