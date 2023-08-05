
interface SelectProps {
    label?: string;
    onChange?: (event: any) => void;
    options:string[],
    selectedIndex?:number,
    
  }

export default function Select({label,onChange,options,selectedIndex}:SelectProps){
  
    return(
        <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium  ">Select Type</label>
            <select value={options[selectedIndex]} onChange={onChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
  {
    options?.map((category,index)=>{
        return(
            <option  value={category}>{category}</option>
        )
      

    })
  }

</select>
        </div>
    )
}