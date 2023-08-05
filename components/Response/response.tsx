import Card from "../card/cards";
import CategoriesResponse from "./categoriesResponse";
import ClozeResponse from "./clozeResponse";
import ComprehensionResponse from "./comprehensionResponse";
import McqResponse from "./mcqRsponse";
import TextResponse from "./textResponse";


export default function ResponseComponent({response}){
    console.log(response,'hemlu')
   
    const renderQuestionComponent = (questionType, data) => {
        switch (questionType) {
          case 'cloze':
            return <ClozeResponse image={data?.image} description={data.description} spaces={data.spaces} />;
          case 'categorize':
            return (
              <CategoriesResponse
              image={data?.image}
            lists={data.lists}/>
            )
 
          case 'mcq':
            return <McqResponse image={data?.image} options={data.options} description={data.description}/>  
          case 'text':
            return <TextResponse image={data?.image} description={data.description} answer={data.answer} />
          case 'comprehension':
             return <ComprehensionResponse image={data?.image}  descriptionText={data.description} comprehensionText={data.comprehensionText} comprehension_array={data.comprehensionArray} />
     
          default:
            return null;
        }
      };

    return (
        <div>
           {response?.map((data, index) => (
          <Card key={index}>
            {renderQuestionComponent(data.type, data)}
          </Card>


        ))}

        </div>




    ) 


}