import * as React from "react";
const { useMotionValue, Reorder, useDragControls } = require("framer-motion");
import { ReorderIcon } from "./icon/reorderIcon";

interface Props {
  item: {item:string};
  id:string,
  value?:string
}

export const Item = ({ item, id, value, children }: React.PropsWithChildren<Props>) => {
  const [draggable, setDraggable] = React.useState(false)
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      key={id}
      value={item}
      id={id}
      className='m-3'
      dragListener={draggable}
      onDragEnd={() => setDraggable(false)}
    >
      <div style={{
        userSelect: 'none',
        cursor: 'default',
      }} className="border border-gray-700 m-2 p-2 w-fit flex" >
        <ReorderIcon setDraggable={setDraggable} />
        {/* <span>{value}</span> */}
        {children} {/* Render the children */}
      </div>
    </Reorder.Item>
  );
};
