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
        const newItem = { index: index,type:type };
        state.Questions = [...state.Questions, newItem];
        console.log(state.Questions)
      },

    updateItem:(state,action)=>{
        const {index,type,key,value}=action.payload;
        let question = state.Questions.find(item => item.index === index);
        question[key]=value;
        // console.log(key,value,state.Questions,'bachaoo')
    },
    updateNestedItem:(state,action)=>{
        const {parent,index,key,value}=action.payload;
        console.log(parent,'parrreent')
        const parentQuest=state.Questions.find((q:any)=>q.index===parent);
        // const parentQuest =state.Questions.find((item)=>item.index===parent);
        console.log(parentQuest,'questt')
        const question=parentQuest['questions_comprehension'].find((item)=>item.index===index)
        question[key]=value;
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

export const { addQuestion,updateItem,updateNestedItem } = itemsSlice.actions;

export default itemsSlice.reducer;
