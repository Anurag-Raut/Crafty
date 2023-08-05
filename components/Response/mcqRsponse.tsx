import { useRenderHook } from "@/hooks/reduxhook"
import { updateNestedRenderComponents, updateRenderComponents } from "@/redux/reducers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {motion} from 'framer-motion'


export default function McqResponse({options,description}){
  
   
    return(
        <div className="p-4 border rounded shadow">
          <label className="font-bold text-lg" >Description</label>
        <p className="m-3 ">{description}</p>
        <label className="font-bold text-lg" >Options : </label>
        <ul>
          {options?.map((option, index) => (
            <motion.li
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
              key={index}
              className={`p-2 cursor-pointer m-2 border-2 border-gray-400  ${
                option.selected === 1
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-400'
              }`}
            
            >
              {option.text}
            </motion.li>
          ))}
        </ul>
      </div>
    )
}