import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DroppableSpace from './droppableSpace';
import DraggableItem from './draggableItem';
import { useRenderHook } from '@/hooks/reduxhook';
import { useDispatch } from 'react-redux';
import { updateNestedRenderComponents, updateRenderComponents } from '@/redux/reducers';
import Image from 'next/image';

export default function CategorizeRenderer({ categories, categoriesItems, id, parent,image }) {
    const dispatch = useDispatch();
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

    useEffect(() => {
        function addType() {
            if (parent) {
                dispatch(updateNestedRenderComponents({ index: id, parent, key: 'type', value: 'categorize' }))
            }
            else {
                dispatch(updateRenderComponents({ index: id, key: 'type', value: 'categorize' }))
            }

        }
        addType()


    }, [])




    
    const { value: lists, handleChange: setLists } = useRenderHook(id, 'lists', parent)



    useEffect(() => {
        if (!categories || !categoriesItems) {
            return
        }
        if (lists) {
            return
        }
        let initialState = { bag: [] }
        console.log(categories)
        categories?.map((item) => {
            initialState[item] = []
        })
        categoriesItems?.map(({ item }) => {
            initialState['bag'].push(item)
        })
        setLists(initialState)

    }, [categories, categoriesItems, lists])

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const sourceList = lists[result.source.droppableId];
        const destinationList = lists[result.destination.droppableId];
        if (sourceList === destinationList) {
            return
        }
        console.log(sourceList, 'dest', destinationList, result.source.index)
        const newSourceList = [...sourceList];
        const newDestinationList = [...destinationList]

        const [movedItem] = newSourceList.splice(result.source.index, 1);

        console.log(movedItem)
        newDestinationList.splice(result.destination.index, 0, movedItem);

        setLists({
            ...lists,
            [result.source.droppableId]: newSourceList,
            [result.destination.droppableId]: newDestinationList,
        });
    }


    return (



        <div className='h-full m-2'>
  {
                image && <div className="my-2">
                <div className='font-bold text-lg'>Image : </div>

                 <img src={image} className='max-h-[40vh]   border-2 p-5' alt={'image not able to load'} />
            </div>
            }
            
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className='min-h-[200px] h-full  '>
                    <label className='text-lg font-bold'>Items : </label>
                    <DroppableSpace fit={false} color={lightBeautifulColors[0]}>
                        <Droppable droppableId={'bag'} >
                            {(provided) => (
                                <ul
                                    className="characters  w-full h-full flex flex-wrap "
                                    style={{ listStyle: 'none', padding: '10px',  }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {lists && lists['bag']?.map((data, index) => (
                                        <Draggable key={data} draggableId={data} index={index}>
                                            {(provided) => (
                                                <li
                                                    className='m-3'
                                                    style={{

                                                        ...provided.draggableProps.style,
                                                    }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <DraggableItem>
                                                        {data}
                                                    </DraggableItem>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}


                                </ul>
                            )}

                        </Droppable>
                    </DroppableSpace>
                </div>
              
                
                <div className='mt-11' >
                <label className='font-bold text-lg' >Categories : </label>
                <div className=' flex justify-between flex-wrap  ' >

                    
                    {lists && Object.keys(lists)
                        .filter((listId) => listId !== 'bag')
                        .map((listId,index) => (
                            <div className='min-w-[200px] flex flex-col items-center w-fit min-h-[200px] m-3'>
                         
                                <DroppableSpace fit={false} color={lightBeautifulColors[(index+1) % lightBeautifulColors.length]} >
                                    <Droppable key={listId} droppableId={listId}>
                                        {(provided) => (
                                            <ul
                                                className="characters w-full h-full"
                                                style={{ listStyle: 'none', padding: '10px' }}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {lists && lists[listId].map((data, index) => (
                                                    <div className='m-3'>

                                                    <Draggable key={data} draggableId={data} index={index}>
                                                        {(provided) => (
                                                            <li
                                                            className='m-3'
                                                                style={{
                                                                   
                                                                    padding: '5px',
                                                                    border: '1px solid #ccc',
                                                                    backgroundColor: 'white',
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                            >
                                                                <DraggableItem>
                                                                    {data}
                                                                </DraggableItem>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                    </div>
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </DroppableSpace>
                                <label className='font-bold text-lg ' >{listId}</label>
                            </div>
                        ))}
                </div>
                </div>
            </DragDropContext>

        </div>


    );



}