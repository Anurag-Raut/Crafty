import * as React from "react";
const { useMotionValue, Reorder, useDragControls } = require("framer-motion");
import { ReorderIcon } from "./icon/reorderIcon";
import Card from "./card/cards";
import {motion } from 'framer-motion'
import { BiAddToQueue } from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai'
import AddIcon from "./addIcon";
interface Props {
  item: {item:string};
  id:string,
  value?:string
  card?:boolean
}

export const Item = ({ item, id, value,card, children }: React.PropsWithChildren<Props>) => {
  const [draggable, setDraggable] = React.useState(false)
  const y = useMotionValue(0);
  const [show,setShow]=React.useState(0);

  return (
    <Reorder.Item
      key={id}
      value={item}
      id={id}
      className='m-3 w-full'
      dragListener={draggable}
      onDragEnd={() => setDraggable(false)}
    >
      <Card>

      <motion.div style={{
        userSelect: 'none',
        cursor: 'default',
      }} className="flex" 
      onMouseEnter={()=>{setShow(1)}}
      onMouseLeave={()=>{setShow(0)}}
      
      >
        <div>
        <ReorderIcon setDraggable={setDraggable} />
        {
          card && show?
          <div>
            <AddIcon  />
            <AiFillDelete className='scale-125 mt-3' />
          </div>
          
          :null
        

        }
        </div>
        
        {/* <span>{value}</span> */}
        {children} {/* Render the children */}
      </motion.div>


      </Card>

     
    </Reorder.Item>
  );
};
