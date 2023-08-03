import {motion} from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export default function DroppableSpace({children}){



    return(
        <motion.div className='bg-green-400 w-full m-2 h-full'>
      
            {children}
      
         
        </motion.div>
    )


}