import React, { ChangeEvent } from 'react';
const { motion } = require("framer-motion");
interface InputTextProps {
    label?: string;
    onChange?: (event: any) => void;
    placeholder?: string;
    value?:string|number,
    type?:string
  }
export default function InputText({label,onChange,placeholder,value,type='text'}:InputTextProps){
    return (
        <motion.div className="mb-6"
        initial={{size:0}}
        animate={{ size: 100 }}
        transition={{ delay: 1 }}
     
        >
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-600 ">{label}</label>
            <input value={value} onChange={onChange} placeholder={placeholder} type={type} id="default-input" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " />
        </motion.div>
    )
}