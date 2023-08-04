import * as React from "react";
const { useMotionValue, Reorder, useDragControls } = require("framer-motion");
import { ReorderIcon } from "./icon/reorderIcon";
import Card from "./card/cards";
import { motion } from 'framer-motion'
import { BiAddToQueue } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai'
import AddIcon from "./addIcon";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "@/redux/reducers";
interface Props {
  item: { item: string };
  id: string,
  value?: string
  card?: boolean
  pos?: number
  comprehension?: boolean
  parentId?: boolean
}




export const Item = ({ item, id, value, card, pos, comprehension, parentId, children }: React.PropsWithChildren<Props>) => {
  const dispatch = useDispatch();
  const [draggable, setDraggable] = React.useState(false)
  const [show, setShow] = React.useState(0);



  return (
    <Reorder.Item
      key={id}
      value={item}
      id={id}
      className='m-3 w-full'
      dragListener={draggable}
      onDragEnd={() => setDraggable(false)}
    >


      <motion.div style={{
        userSelect: 'none',
        cursor: 'default',
      }} className="flex flex-row items-start"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onMouseEnter={() => { setShow(1) }}
        onMouseLeave={() => { setShow(0) }}

      >
        <div className="mt-5">
          <ReorderIcon setDraggable={setDraggable} />
          {
            card && show ?
            
              <div>
                <AddIcon parentId={parentId} comprehension={comprehension} pos={pos} />
                <AiFillDelete onClick={() => { dispatch(deleteQuestion({ index: pos, parentId: parentId, comprehension: comprehension })) }} className='scale-125 mt-3 text-red-600' />
              </div>

              : null


          }
        </div>


        {children}
      </motion.div>





    </Reorder.Item>
  );
};
