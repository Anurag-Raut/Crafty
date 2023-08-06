

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateArray, updateItem, updateNestedItem, updateNestedRenderComponents, updateRenderComponents } from '../redux/reducers';

export function useHook(index:string,name:string,parent?:string) {
    console.log(index)
    const value = useSelector((state: any) => {
        // var question;
        if(parent){
            console.log(parent,'parent');
            const parentQuest=state.Questions.find((q:any)=>q.index===parent);
            console.log(parentQuest,'parentQuest');
            
           const question = parentQuest['questions_comprehension'].find((q: any) => q.index === index);
            return question ? question[name] : undefined;
        }
        else{
            console.log(index,'helo',name)
            const question = state.Questions.find((q: any) => q.index === index);
            console.log(question,'lauku');
            return question ? question[name] : undefined;
        }
       
        // return question ? question[name] : undefined;
      });
    // const value=question[name]

  const dispatch = useDispatch();

  const handleChange = ( newValue) => {
    console.log(newValue,'newValue',name)
   

    // Dispatch updateItem action to update the Redux store
    if(parent){
        dispatch(updateNestedItem({index,key:name,value:newValue,parent}));
    }
    else{
        dispatch(updateItem({index,key:name,value:newValue}));
    }       
   

  };

  return { value, handleChange };
}


export function useNestedHook(index:string,name:string,parent:string){

    const value = useSelector((state: any) => {
        const question = state.Questions[parent].find((q: any) => q.id === index);
        return question ? question : undefined;
      });
    // const value=question[name]

  const dispatch = useDispatch();

  const handleChange = ( newValue) => {
    console.log(newValue,'newValue')
   

    // Dispatch updateItem action to update the Redux store
    dispatch(updateNestedItem({index,key:name,value:newValue,parent}));
  };

  return { value, handleChange };


}

export function useImageHook(name:string){
  const value=useSelector((state:any)=>{
    return state.image?state.image:undefined
  })
  const dispatch=useDispatch();

  const handleChange=(newvalue)=>{
    dispatch(updateArray({value:newvalue,array:name,name:'image'}))
  }

  return { value, handleChange };
}


export function useRenderHook(index:string,name:string,parent?:string){

  const value = useSelector((state: any) => {
    if(parent){
      const parentComponent=state?.RenderComponents.find((q)=>q.index===parent);
      const renderComponent = parentComponent['comprehensionArray']?.find((q: any) => q.index === index);
      return renderComponent ? renderComponent[name] : undefined;
    }
    else{
      const renderComponent = state?.RenderComponents?.find((q: any) => q.index === index);
      return renderComponent ? renderComponent[name] : undefined;
    }
   
  });
// const value=question[name]

const dispatch = useDispatch();

const handleChange = ( newValue) => {
console.log(newValue,'newValue')


// Dispatch updateItem action to update the Redux store
if(parent){
  dispatch(updateNestedRenderComponents({index,key:name,value:newValue,parent}))
}
else{
  dispatch(updateRenderComponents({index,key:name,value:newValue}));

}
};

return { value, handleChange };



}

