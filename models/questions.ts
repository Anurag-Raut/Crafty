
import mongoose, { Document } from 'mongoose';

interface BaseQuestion extends Document {
    description: string;
    type: 'text' | 'mcq' | 'categorize' | 'cloze' | 'comprehension';
  }
  
  interface TextQuestion extends BaseQuestion {
    type: 'text';
    minWordLimit: number;
    maxWordLimit: number;
  }
  
  interface McqQuestion extends BaseQuestion {
    type: 'mcq';
    options: string[];
    answers: string[];
  }
  
  interface ClozeQuestion extends BaseQuestion {
    type: 'cloze';
    underlinedContents: {}[];
    contents: string;
  }
  
  interface CategorizeQuestion extends BaseQuestion {
    type: 'categorize';
    categories: string[];
    categoriesItems: {}[];
  }
  
  interface ComprehensionQuestion extends BaseQuestion {
    type: 'comprehension';
    questions: BaseQuestion[];
  }
  
  type Question = TextQuestion | McqQuestion | ClozeQuestion | CategorizeQuestion | ComprehensionQuestion;
  
const questionSchema = new mongoose.Schema<Question>({
  description: String,
  type: String,
 
});

export default mongoose.model<Question>('Question', questionSchema);
