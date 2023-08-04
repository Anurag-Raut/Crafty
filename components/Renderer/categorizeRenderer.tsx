import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DroppableSpace from './droppableSpace';
import DraggableItem from './draggableItem';
import { useRenderHook } from '@/hooks/reduxhook';
import { useDispatch } from 'react-redux';
import { updateNestedRenderComponents, updateRenderComponents } from '@/redux/reducers';

export default function CategorizeRenderer({ categories, categoriesItems, id,parent }) {
    const dispatch=useDispatch();
    
    useEffect(()=>{
        function addType(){
    if(parent){
        dispatch(updateNestedRenderComponents({index:id,parent,key:'type',value:'categorize'}))
    }
    else{
        dispatch(updateRenderComponents({index:id,key:'type',value:'categorize'}))
    }

        }
        addType()
        

    },[])
    



    // const [lists, setLists] = useState({});
    const { value: lists, handleChange: setLists } = useRenderHook(id, 'lists',parent)



    useEffect(() => {
        if (!categories || !categoriesItems) {
            return
        }
        if(lists){
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

    }, [categories,categoriesItems,lists])

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const sourceList = lists[result.source.droppableId];
        const destinationList = lists[result.destination.droppableId];
        if(sourceList===destinationList){
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



        <div className='h-fit m-2'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className=''>
                    <DroppableSpace>
                        <Droppable droppableId={'bag'} >
                            {(provided) => (
                                <ul
                                    className="characters flex"
                                    style={{ listStyle: 'none', padding: '10px', border: '1px solid #ddd' }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {lists && lists['bag']?.map((data, index) => (
                                        <Draggable key={data} draggableId={data} index={index}>
                                            {(provided) => (
                                                <li
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {lists && Object.keys(lists)
                        .filter((listId) => listId !== 'bag')
                        .map((listId) => (
                            <div className='min-w-[100px] w-fit min-h-[200px]'>

                                <DroppableSpace>
                                    <Droppable key={listId} droppableId={listId}>
                                        {(provided) => (
                                            <ul
                                                className="characters w-full h-full"
                                                style={{ listStyle: 'none', padding: '10px', border: '1px solid #ddd' }}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {lists && lists[listId].map((data, index) => (
                                                    <Draggable key={data} draggableId={data} index={index}>
                                                        {(provided) => (
                                                            <li
                                                                style={{
                                                                    margin: '5px',
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
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </DroppableSpace>
                            </div>
                        ))}
                </div>
            </DragDropContext>

        </div>


    );



}