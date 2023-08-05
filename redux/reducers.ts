// reducers.js
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { HYDRATE } from "next-redux-wrapper";
import uniqid from 'uniqid'

const initialState = {
  Questions: [{
    type:'text',
    index:uniqid(),
    
  }],
  RenderComponents:[]
};


const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
        const { index,type,pos,comprehension,parentId } = action.payload;
        const newItem = { index: index,type:type };
        if(!state.Questions){
          state.Questions=[]
        }
        if(comprehension){
          console.log(index)
          let question=state.Questions.find((q)=>q.index===parentId);
          question['questions_comprehension'].splice(pos,0,newItem)
        }
        else{
          state.Questions.splice(pos,0,newItem)

        }
        // state.Questions = [...state.Questions, newItem];
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
    },
    updateMainQuestions:(state,action)=>{
      const newvalue=action.payload;
       state.Questions=newvalue
      // question=value;
    },
    updateNestedRenderComponents:(state,action)=>{
      const {parent,index,key,value}=action.payload;
      console.log(parent,'parrreent')
      const parentComp=state.RenderComponents.find((q:any)=>q.index===parent);
      // const parentQuest =state.Questions.find((item)=>item.index===parent);
      console.log(parentComp,'questt')
      const renderComp=parentComp['comprehensionArray'].find((item)=>item.index===index)
      renderComp[key]=value;
  },

    updateRenderComponents:(state,action)=>{
      const {index,type,key,value}=action.payload;
     if(!state.RenderComponents){
      state.RenderComponents=[];
     }
        let renderComponent = state.RenderComponents.find(item => item.index === index);
        if(!renderComponent){
          state.RenderComponents=[...state.RenderComponents,{index:index,key:value}]
        }
        else{
          renderComponent[key]=value;
        }
      
      
    },
    deleteQuestion:(state,action)=>{
      const{index,comprehension,parentId}=action.payload;
      if(comprehension){
        let question=state.Questions.find((q)=>q.index===parentId);
        console.log(question)
        question['questions_comprehension'].splice(index,1);
      }
      else{
        state.Questions.splice(index, 1);
      }

    },
    resetState: () => initialState,
    
    
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

export const { addQuestion,updateItem,deleteQuestion,updateNestedItem,updateNestedRenderComponents ,updateMainQuestions,updateRenderComponents,resetState} = itemsSlice.actions;

export default itemsSlice.reducer;
