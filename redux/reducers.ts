// reducers.js
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  Questions: [],
};


const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
        const { index,type } = action.payload;
        const newItem = { index: state.Questions.length,type:type };
        state.Questions = [...state.Questions, newItem];
        console.log(state.Questions)
      },

    updateItem:(state,action)=>{
        const {index,type,key,value}=action.payload;
        let question = state.Questions.find(item => item.index === index);
        question[key]=value;
        // console.log(key,value,state.Questions,'bachaoo')
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
}
});

export const { addQuestion,updateItem } = itemsSlice.actions;

export default itemsSlice.reducer;
