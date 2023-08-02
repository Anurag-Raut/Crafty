import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import { createWrapper } from "next-redux-wrapper";
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };
const makeStore:any = () =>{
    const preloadedState = loadState()
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
      });
    
      // Save state to localStorage whenever the state changes
      store.subscribe(() => {
        localStorage.setItem('reduxState', JSON.stringify(store.getState()));
      });
    
      return store;
};

export const wrapper:any = createWrapper(makeStore);