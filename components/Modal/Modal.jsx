import { useState } from "react"
import Toggle from "./toggle";
export default function Modal ({children,onClick}){
const [open,setOpen]=useState(false);
const handleToggle = () => setOpen((prev) => !prev);


// console.log(videoData)


    return (
        <div>

          <button className="btn bg-base-200" onClick={()=>{document.getElementById('my_modal_3').classList.add('modal-open')}}>Submit</button>
          <dialog id="my_modal_3" className="modal  ">
            <form method="dialog" className="modal-box ">
              <div onClick={()=>{document.getElementById('my_modal_3').classList.remove('modal-open')}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</div>
              { children
                }
                <button onClick={onClick} type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>

            </form>
          </dialog>
       

        </div>
    )

}