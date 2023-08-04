import CategorizeRenderer from "@/components/Renderer/categorizeRenderer";
import ClozeRenderer from "@/components/Renderer/clozeRenderer";
import ComprehensionRenderer from "@/components/Renderer/comprehensionRenderer";
import McqRenderer from "@/components/Renderer/mcqRenderer";
import TextRenderer from "@/components/Renderer/textRenderere";
import Card from "@/components/card/cards";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Render() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  const { id } = router.query;

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
        return <ClozeRenderer id={data.index} contents={data.text} parent={undefined} />;
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
    <div>
      <Card>
        {questions.map((data, index) => (
          <Card key={index}>
            {renderQuestionComponent(data.type, data)}
          </Card>
        ))}
      </Card>
    </div>
  );
}
