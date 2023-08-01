
interface SelectProps {
    label?: string;
    onChange?: (event: any) => void;
    options:string[]
    
  }

export default function Select({label,onChange,options}:SelectProps){
    return(
        <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
<select onChange={onChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
  {
    options?.map((category)=>{
        return(
            <option value={category}>{category}</option>
        )
      

    })
  }

</select>
        </div>
    )
}