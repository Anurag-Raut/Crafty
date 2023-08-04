import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableItem from './draggableItem';
import DroppableSpace from './droppableSpace';
import { useRenderHook } from '@/hooks/reduxhook';
import { useDispatch } from 'react-redux';
import { updateNestedRenderComponents, updateRenderComponents } from '@/redux/reducers';


export default function ClozeRenderer({contents,id,parent,description}) {
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
  const {value:bag,handleChange:setBag}=useRenderHook(id,'bag',parent);
  const {value:spaces,handleChange:setSpaces}=useRenderHook(id,'spaces',parent);
  // const [spaces, setSpaces] = useState([]);

  const dispatch=useDispatch();
    
  useEffect(()=>{
      function addType(){
  if(parent){
      dispatch(updateNestedRenderComponents({index:id,parent,key:'type',value:'cloze'}))
  }
  else{
      dispatch(updateRenderComponents({index:id,key:'type',value:'cloze'}))
  }

      }
      addType()
      

  },[])
  
 

  useEffect(() => {
    if(bag){
      return
    }
    const inputString = contents;

    const regex = /<u>(.*?)<\/u>|([^<]*)/g;
    const matches = [...inputString?.matchAll(regex)];
    const extractedTextArray = matches.map(match => {
      const extractedText = (match[1] || match[2]).trim();
      const space = match[1] ? true : false;
      if (space) {
        return { content: null, space, id: `space${ind++}` };
      } else {
        return { content: extractedText, space };
      }
    });

    const initialBag = matches
      .map((match) => {
        const extractedText = (match[1] || match[2]).trim();
        const space = match[1] ? true : false;
        return space ? { text: extractedText, id: `drag${ind++}` } : null;
      })
      .filter((item) => item !== null);

    setBag(initialBag);
    setSpaces(extractedTextArray);
  }, [bag,spaces]);

  console.log(bag,'bagggggg')

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const sourceType = result.source.droppableId.startsWith('space') ? 'space' : 'bag';
    const destinationType = result.destination.droppableId.startsWith('space') ? 'space' : 'bag';

    if (sourceType === 'space' && destinationType === 'space') {
      // Update spaces by swapping content between source and destination
      let updatedSpaces = [...spaces];
      let sourceIndex = updatedSpaces.findIndex((space) => space.id === result.source.droppableId);
      let destinationIndex = updatedSpaces.findIndex((space) => space.id === result.destination.droppableId);
      
      // Create shallow clones of objects to modify
      let sourceSpace = { ...updatedSpaces[sourceIndex] };
      let destinationSpace = { ...updatedSpaces[destinationIndex] };
      
      let movedItem = sourceSpace.content;
      
      // Modify the cloned objects
      sourceSpace.content = destinationSpace.content;
      destinationSpace.content = movedItem;
      
      // Update the array with the modified objects
      updatedSpaces[sourceIndex] = sourceSpace;
      updatedSpaces[destinationIndex] = destinationSpace;
    
      setSpaces(updatedSpaces);
    } else if (sourceType === 'space' && destinationType === 'bag') {
      const sourceSpace = spaces?.find((space) => space.id === result.source.droppableId);

     
        // Update the source space content to null
        const updatedSpaces = spaces.map((space) =>
          space.id === result.source.droppableId ? { ...space, content: null } : space
        );
        setSpaces(updatedSpaces);
 

      setBag(sourceSpace.content !== null ? [...bag, { text: sourceSpace.content, id: sourceSpace.index }] : bag);
    } else if (sourceType === 'bag' && destinationType === 'space') {
      setBag( 
        // Remove the dragged item from the bag
        bag.filter((item, index) => index !== result.source.index)
        // return updatedBag;
      );

   
        // Update the destination space content with the dragged item's text
        const updatedSpaces = spaces.map((space) =>
          space.id === result.destination.droppableId ? { ...space, content: bag[result.source.index].text } : space
        );
        setSpaces(updatedSpaces);
 
    }
  }

  return (
    <div className='mb-10 h-contents'>
      <div>
      <label className='text-lg font-bold' >Description : </label>
      <div>{description}</div>

      </div>

     
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{ padding: '20px', height: '100%' }} className='list-none'>
        <label className='text-lg font-bold' >Items : </label>
          <DroppableSpace color={lightBeautifulColors[0]} fit={0} >
            <Droppable droppableId="bag" direction="horizontal">
              {(provided, snapshot) => (
                <ul
                className='list-none grid grid-cols-3 gap-4 p-4 h-full w-full'                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {bag?.map(({ text: item },index) => (
                    <Draggable className='list-none' key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <li
                          className='list-none  flex justify-center items-center'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DraggableItem>{item}</DraggableItem>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DroppableSpace>

          <div className='flex flex-wrap mt-5 items-center'>
            {spaces?.map(({ space, id, content }, index) =>
              space === true ? (
                <div key={id} className='w-[120px] h-[60px] m-2 '>
                  <DroppableSpace color={lightBeautifulColors[(index+1)%lightBeautifulColors.length]} fit={1} >
                    <Droppable
                      key={id}
                      droppableId={id}
                      // isDropDisabled={content !== null}
                    >
                      {(provided, snapshot) => (
                        <div
                        className=' '
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {content !== null ? (
                            <Draggable key={content} draggableId={content} index={index}>
                              {(provided) => (
                                <div
                                  className='flex justify-center  items-center list-none'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <DraggableItem>{content}</DraggableItem>
                                </div>
                              )}
                            </Draggable>
                          ) : (
                            <div className='w-full h-full flex justify-center items-center'>
                              {/* Additional content for empty space */}
                              <div className='w-[100px] h-[20px] '></div>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </DroppableSpace>
                </div>
              ) : (
                <div key={id} className='w-fit m-2'>
                  {content}
                </div>
              )
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
