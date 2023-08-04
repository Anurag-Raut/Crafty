import { useRenderHook } from "@/hooks/reduxhook"



export default function McqRenderer({options,description,id,parent}){
    const {value:selectedOption,handleChange:setSelectedOption}=useRenderHook(id,'selectedOption',parent)
    return(
        <div className="p-4 border rounded shadow">
        <p className="mb-2 font-bold">{description}</p>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${
                selectedOption === index
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() =>  setSelectedOption(index)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
    )
}