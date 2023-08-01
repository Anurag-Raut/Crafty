import * as React from "react";
const { useMotionValue, Reorder, useDragControls } = require("framer-motion");
import { ReorderIcon } from "./icon/reorderIcon";



interface Props {
  item: {item:string};
  id:string
}

export const Item = ({ item,id }: Props) => {
  const y = useMotionValue(0);

  const dragControls = useDragControls();

  return (
    <Reorder.Item
    key={id}
      value={item}
      id={id}
      style={{width:'100%'}}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className=" border border-gray-700 m-2 p-2 w-full flex justify-between" >
        <span >{item.item}</span>
      
      </div>
      <ReorderIcon dragControls={dragControls} />
      
    </Reorder.Item>
  );
};
