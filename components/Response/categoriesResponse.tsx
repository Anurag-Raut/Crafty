import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import { updateNestedRenderComponents, updateRenderComponents } from '@/redux/reducers';
import DroppableSpace from '../Renderer/droppableSpace';
import DraggableItem from '../Renderer/draggableItem';

export default function CategoriesResponse({ lists,image }) {
   
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

 




    
  






    return (



        <div className='h-full m-2'>
             {
                image && <div className="my-2">
                <div className='font-bold text-lg'>Image : </div>

                 <img src={image} className='max-h-[40vh]   border-2 p-5' alt={'image not able to load'} />
            </div>
            }
        
                <div className='min-h-[200px] h-full  '>
                    <label className='text-lg font-bold'>Items : </label>
                    <DroppableSpace fit={false} color={lightBeautifulColors[0]}>
                        <div >
                       
                                <ul
                                    className="characters  w-full h-full flex flex-wrap "
                                    style={{ listStyle: 'none', padding: '10px',  }}
                                
                                >
                                    {lists && lists['bag']?.map((data, index) => (
                                        <div key={data} >
                                       
                                                <li >
                                                    <DraggableItem>
                                                        {data}
                                                    </DraggableItem>
                                                </li>
                                        
                                        </div>
                                    ))}
                             


                                </ul>
                    

                        </div>
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
                                    <div key={listId} >
                                     
                                            <ul
                                                className="characters w-full h-full"
                                                style={{ listStyle: 'none', padding: '10px' }}
                                              
                                            >
                                                {lists && lists[listId].map((data, index) => (
                                                    <div className='m-3'>

                                                    <div key={data} >
                                                      
                                                            <li
                                                         
                                                                style={{
                                                                   
                                                                  
                                                                    
                                                                }}
                                                              
                                                            >
                                                                <DraggableItem>
                                                                    {data}
                                                                </DraggableItem>
                                                            </li>
                                               
                                                    </div>
                                                    </div>
                                                ))}
                                       
                                            </ul>
                          
                                    </div>
                                </DroppableSpace>
                                <label className='font-bold text-lg ' >{listId}</label>
                            </div>
                        ))}
                </div>
                </div>
   

        </div>


    );



}