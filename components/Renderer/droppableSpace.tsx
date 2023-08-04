import {motion} from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export default function DroppableSpace({color,fit,children}){


    console.log(color)
    return(
        <motion.div  style={{ backgroundColor: color }} className={` w-${fit&children?'fit':'full'} m-2 h-${fit&children?'fit':'full'} rounded-xl i flex items-center justify-center flex-wrap border-2 border-black  `}>
      
            {children}
      
         
        </motion.div>
    )


}