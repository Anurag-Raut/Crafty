import {motion} from 'framer-motion'


export default function DraggableItem({children}){

    return(
        <motion.div className='p-2 border border-black w-fit'> 
        {children}
        </motion.div>
        

    )


}