import CategorizeRenderer from "@/components/Renderer/categorizeRenderer";
import ClozeRenderer from "@/components/Renderer/clozeRenderer";
import ComprehensionRenderer from "@/components/Renderer/comprehensionRenderer";
import McqRenderer from "@/components/Renderer/mcqRenderer";
import TextRenderer from "@/components/Renderer/textRenderere";
import Card from "@/components/card/cards";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Render() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  const { id } = router.query;
  const response =useSelector((state:any)=>state.RenderComponents);
  const submitResponse=()=>{
    console.log(response);
    async function save (){
      try {
          let res = await fetch("http://localhost:3000/api/postResponse", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify({document:response,id:id})
            });
            let allPosts = await res.json();
      
          console.log('New response array saved successfully.',allPosts);
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

    const apiUrl = `http://localhost:3000/api/getform`;

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
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [id]);

  const renderQuestionComponent = (questionType, data) => {
    switch (questionType) {
      case 'cloze':
        return <ClozeRenderer description={data.description} id={data.index} contents={data.text} parent={undefined} />;
      case 'categorize':
        return (
          <CategorizeRenderer
          parent={undefined}
            categories={data.categories}
            categoriesItems={data.categoriesItems}
            id={data.index}
          />
        );
      case 'mcq':
        return <McqRenderer parent={undefined} id={data.index} options={data.options} description={data.description}/>  
      case 'text':
        return <TextRenderer parent={undefined} id={data.index} descriptionText={data.description} />
      case 'comprehension':
        return <ComprehensionRenderer id={data.index} descriptionText={data.description} comprehensionText={data.comprehensionText} comprehension_array={data.questions_comprehension} />
      // Add cases for other question types here
      default:
        return null;
    }
  };

  return (
    <div className="p-24">
      <Card>
        {questions.map((data, index) => (
          <Card key={index}>
            {renderQuestionComponent(data.type, data)}
          </Card>


        ))}

        <button onClick={()=>submitResponse()}>Submit</button>
      </Card>
    </div>
  );
}
