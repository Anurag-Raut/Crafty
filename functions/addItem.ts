import { addQuestion } from "@/redux/reducers";



export function addItem(id: string, type: string,pos?:number) {


  const questionStructure = { type, id, index: id,pos:pos };
  switch (type) {
    case 'cloze':
      questionStructure['description'] = '';
      questionStructure['underlinedContents'] = [];
      questionStructure['contents'] = '';
      break;

    case 'mcq':
      questionStructure['description'] = '';
      questionStructure['options'] = [];
      questionStructure['answers'] = [];
      break;

    case 'text':
      questionStructure['description'] = '';
      questionStructure['minWordLimit'] = 0; // Add appropriate values
      questionStructure['maxWordLimit'] = 0; // Add appropriate values
      break;

    case 'categorize':
      questionStructure['description'] = '';
      questionStructure['categories'] = [];
      questionStructure['categoriesItems'] = [];
      break;

    case 'comprehension':
      questionStructure['description'] = '';
      questionStructure['comprehensionText'] = '';
      questionStructure['questions'] = [];
      break;

    default:
      return null;
  }

  return questionStructure;


}
