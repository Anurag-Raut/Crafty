
import { addQuestion } from '@/redux/reducers';
import { BiAddToQueue } from 'react-icons/bi';
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux';
import { addItem } from '@/functions/addItem';

export default function AddIcon({pos,comprehension,parentId}){
    const dispatch=useDispatch();
    const handleAddItem = (type) => {
        let id=uniqid();
        var initialState:any=addItem(id,type,pos);
        initialState.comprehension=comprehension
        initialState.parentId=parentId
       
        dispatch(addQuestion(initialState))
      
      };

    return(
        <div className="dropdown dropdown-hover">
  <label tabIndex={0} className=""><BiAddToQueue className='scale-125 mt-3 text-green-600 ' /></label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
   {
    ['text','mcq','categorize','cloze','comprehension'].map((type)=>{
        return <li onClick={(e) => handleAddItem(type)}>
        <a data-value={type}>{type}</a>
      </li>
    })
   }
  </ul>
</div>

    )

}