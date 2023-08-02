

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../redux/reducers';

export function useHook(index,name) {
    const value = useSelector((state:any) => state.Questions[index][name]);
  const dispatch = useDispatch();

  const handleChange = ( newValue) => {
    console.log(newValue,'newValue')
   

    // Dispatch updateItem action to update the Redux store
    dispatch(updateItem({index,key:name,value:newValue}));
  };

  return { value, handleChange };
}
