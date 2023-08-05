import {motion} from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export default function DroppableSpace({color,fit,children,content}:any){

    console.log(children,'clloxzeee',fit)
    console.log(color)
    return(
        <motion.div  style={{ backgroundColor: color }} className={` w-${content&&fit?'fit':'full'} ${!fit?'p-4':null} h-${content&&fit?'fit':'full'} rounded-xl i flex items-center justify-center flex-wrap border-2 border-black m-2 `}>
      
            {children}
      
         
        </motion.div>
    )


}