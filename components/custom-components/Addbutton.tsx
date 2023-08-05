
import {GrAddCircle} from 'react-icons/gr'
export default function AddButton({children,onClick}){

    return (
   

<button type="button" onClick={onClick} className="text-gray-900 m-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 w-fit   "> <div className='flex my-1 items-center w-fit text-md'><GrAddCircle className=' scale-150 mr-3 ' /> {children} </div> </button>


    )

}