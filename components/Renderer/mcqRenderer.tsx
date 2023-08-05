import { useRenderHook } from "@/hooks/reduxhook"
import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {motion} from 'framer-motion'


export default function McqRenderer({options,description,id,parent}){
  console.log(options,'adas')
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
          <label className="font-bold text-lg" >Description</label>
        <p className="m-3 ">{description}</p>
        <label className="font-bold text-lg" >Options : </label>
        <ul>
          {Options?.map((option, index) => (
            <motion.li
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
              key={index}
              className={`p-2 cursor-pointer m-2 border-2 border-gray-400  ${
                option.selected === 1
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-400'
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
            </motion.li>
          ))}
        </ul>
      </div>
    )
}