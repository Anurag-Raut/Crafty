


import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useRenderHook } from '@/hooks/reduxhook';
import { useDispatch } from 'react-redux';
import { updateNestedRenderComponents, updateRenderComponents } from '@/redux/reducers';
import DroppableSpace from '../Renderer/droppableSpace';
import DraggableItem from '../Renderer/draggableItem';


export default function ClozeResponse({description,spaces}) {
  let ind = 0;
  const lightBeautifulColors = [
    '#A0C3D2', // Peach
    '#FFEECC', // Salmon
    '#DDFFBB', // Apricot
    '#FEF2F4', // Watermelon
    '#D4A5A5', // Misty Rose
    '#FFC3A0', // Coral
    '#FF6B6B', // Light Coral
    '#DAA520', // Goldenrod
    '#FFAC33', // Sunglow
    '#FF968A', // Pastel Red
    '#FFD700', // Gold
    '#FFB6C1', // Light Pink
    '#FF9AA2', // Salmon Pink
    '#F08080', // Light Coral
    '#FFA07A', // Light Salmon
    '#FF82AB', // Pink
    '#FF6F61', // Tangerine
    '#FF6347', // Tomato
    '#E9967A', // Dark Salmon
    '#FFA500', // Orange
  ];
  
  // const [spaces, setSpaces] = useState([]);


    

 





  return (
    <div className='mb-10 h-contents'>
      <div>
      <label className='text-lg font-bold' >Description : </label>
      <div>{description}</div>

      </div>

     
      
        <div style={{ padding: '20px', height: '100%' }} className='list-none'>
        <label className='text-lg font-bold' >Items : </label>
          

          <div className='flex flex-wrap mt-5 items-center'>
            {spaces?.map(({ space, id, content }, index) =>
              space === true ? (
                <div key={id} className='border-b-4 border-black mb-4 my-2'>
                    {
                        content?.replace(/&nbsp;/g, '  ')
                    }
                </div>
              ) : (
                <div key={id} className='w-fit m-2'>
                  {content?.replace(/&nbsp;/g, '  ')}
                </div>
              )
            )}
          </div>
        </div>

    </div>
  );
}
