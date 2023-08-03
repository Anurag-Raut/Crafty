import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableItem from './draggableItem';
import DroppableSpace from './droppableSpace';

const initialBag = ['apple', 'banana', 'orange', 'grapes'];
const initialSpaces = [
  { id: 'space1', content: 'item1' },
  { id: 'space2', content: 'item2' },
  // { id: 'space3', content: null },
];


export default function ClozeRenderer() {
  let ind = 0;
  const [bag, setBag] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const inputString = "hgcy  xtx <u>dfbfdzg </u>rgarsgwe <u>esrfsdg  serdfg </u>ergesrgsr sergserg gergrg sergerr <u>gsergrfdg&nbsp;</u>";

  const regex = /<u>(.*?)<\/u>|([^<]*)/g;
  const matches = [...inputString.matchAll(regex)];

  useEffect(() => {
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
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const sourceType = result.source.droppableId.startsWith('space') ? 'space' : 'bag';
    const destinationType = result.destination.droppableId.startsWith('space') ? 'space' : 'bag';

    if (sourceType === 'space' && destinationType === 'space') {
      setSpaces((prevSpaces) => {
        // Update spaces by swapping content between source and destination
        const updatedSpaces = [...prevSpaces];
        const sourceIndex = updatedSpaces.findIndex((space) => space.id === result.source.droppableId);
        const destinationIndex = updatedSpaces.findIndex((space) => space.id === result.destination.droppableId);

        const movedItem = updatedSpaces[sourceIndex].content;
        updatedSpaces[sourceIndex].content = updatedSpaces[destinationIndex].content;
        updatedSpaces[destinationIndex].content = movedItem;

        return updatedSpaces;
      });
    } else if (sourceType === 'space' && destinationType === 'bag') {
      const sourceSpace = spaces.find((space) => space.id === result.source.droppableId);

      setSpaces((prevSpaces) => {
        // Update the source space content to null
        const updatedSpaces = prevSpaces.map((space) =>
          space.id === result.source.droppableId ? { ...space, content: null } : space
        );
        return updatedSpaces;
      });

      setBag((prevBag) => (sourceSpace.content !== null ? [...prevBag, { text: sourceSpace.content, id: sourceSpace.index }] : prevBag));
    } else if (sourceType === 'bag' && destinationType === 'space') {
      setBag((prevBag) => {
        // Remove the dragged item from the bag
        const updatedBag = prevBag.filter((item, index) => index !== result.source.index);
        return updatedBag;
      });

      setSpaces((prevSpaces) => {
        // Update the destination space content with the dragged item's text
        const updatedSpaces = prevSpaces.map((space) =>
          space.id === result.destination.droppableId ? { ...space, content: bag[result.source.index].text } : space
        );
        return updatedSpaces;
      });
    }
  }

  console.log(spaces)

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div style={{ padding: '20px', height: '150px' }} className='list-none' >
        <DroppableSpace>
          <Droppable droppableId="bag" direction="horizontal">
            {(provided, snapshot) => (
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  gap: '10px',
                  border: '1px solid #ddd',
                  padding: '10px',
                  height: '100%',
                  width: '100%',
                  marginBottom: '100px',
                }}
                className='list-none'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {bag.map(({ text: item }, index) => (
                  <Draggable className='list-none' key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <li
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: 'lightgray',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          listStyle:'none'
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DraggableItem>{item}</DraggableItem>
                      </li>
                    )}
                  </Draggable>
                ))}
                {/* {provided.placeholder} */}
              </ul>
            )}
          </Droppable>
        </DroppableSpace>

        <div className='flex flex-wrap w-full mt-5'>
        {spaces.map(({ space, id, content }, index) => (
    space === true ? (
      <div key={id} className='w-fit h-[50px] m-2'>
        <DroppableSpace>
          <Droppable key={id} droppableId={id} isDropDisabled={content !== null}>
            {(provided, snapshot) => (
              <div className='w-fit h-full' {...provided.droppableProps} ref={provided.innerRef}>
                {content !== null ? (
                  <Draggable key={content} draggableId={content} index={index}>
                    {(provided) => (
                      <div
                        className=' flex justify-center items-center list-none'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DraggableItem>{content}</DraggableItem>
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <div className='w-fit h-fit'>
                  
                      {/* Additional content for empty space */}
                      <div className='w-[100px] h-[20px]'>
               
                      </div>

                   
                  </div>
                )}
                {/* {provided.placeholder} */}
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
  ))}
        </div>
      </div>
    </DragDropContext>
  );
}