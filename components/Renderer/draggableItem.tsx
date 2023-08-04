import {motion} from 'framer-motion'


export default function DraggableItem({children}){

    return(
        <motion.div className='px-5 py-3  bg-white rounded-lg text-md border border-black w-fit'> 
        {children}
        </motion.div>
        

    )


}