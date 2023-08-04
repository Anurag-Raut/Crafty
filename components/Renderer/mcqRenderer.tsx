import { useRenderHook } from "@/hooks/reduxhook"
import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



export default function McqRenderer({options,description,id,parent}){
    const {value:Options,handleChange:setOptions}=useRenderHook(id,'options',parent)
    
    const dispatch=useDispatch();
    
    useEffect(()=>{
      if(!Options){
        let newoptions=[]
        options.map((option)=>{
          newoptions.push({...option,selected:0})
        })
        setOptions(newoptions)
      }
  
        function addType(){
    if(parent){
        dispatch(updateNestedRenderComponents({index:id,parent,key:'type',value:'mcq'}))
    }
    else{
        dispatch(updateRenderComponents({index:id,key:'type',value:'mcq'}))
    }

        }
        addType()
        

    },[])


    return(
        <div className="p-4 border rounded shadow">
        <p className="mb-2 font-bold">{description}</p>
        <ul>
          {Options?.map((option, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${
                option.selected === 1
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                const newOptions = Options.map((opt, idx) => {
                  if (idx === index) {
                    return {
                      ...opt,
                      selected: opt.selected ? 0 : 1,
                    };
                  }
                  return opt;
                });
              
                setOptions(newOptions);
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
    )
}