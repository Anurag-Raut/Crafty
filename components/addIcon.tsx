
import { BiAddToQueue } from 'react-icons/bi';
export default function AddIcon(addItem,id,pos){

    return(
        <div className="dropdown dropdown-hover">
  <label tabIndex={0} className=""><BiAddToQueue className='scale-125 mt-3' /></label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
   {
    ['text','mcq','categorize','cloze','comprehension'].map((data)=>{
        return <li onClick={(e) => addItem(id,data,)}>
        <a data-value={data}>{data}</a>
      </li>
    })
   }
  </ul>
</div>

    )

}