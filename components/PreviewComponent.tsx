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

export default function Preview({questions}) {
  

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
        return <McqRenderer image={data?.image} parent={undefined} id={data.index} options={data.options} description={data.description}/>  
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
    <div className="p-24 min-h-screen h-full w-full">
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
