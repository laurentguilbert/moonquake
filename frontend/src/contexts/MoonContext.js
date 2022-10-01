import React, { createContext, useReducer, useContext } from "react";

export const MoonContext = createContext();

// Initial state
const initialState = {
  startDate: null,
  endDate: null,
  data: [],
}

// Actions
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";

// Action creators
export function setStartDate(date) {
  return { type: SET_START_DATE, date };
}

export function setEndDate(date) {
  return { type: SET_START_DATE, date };
}

// Reducer
export function moonReducer(state, action) {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state, 
        startDate: action.date
      };
    case SET_END_DATE:
      return {
        ...state, 
        endDate: action.date
      };
    default:
      return state;
  }
}

function MoonProvider(props) {
  const [state, dispatch] = useReducer(moonReducer, initialState);

  const moonData = { state, dispatch };

  return <MoonContext.Provider value={moonData} {...props} />;
}

function useMoonContext() {
  return useContext(MoonContext);
}

export { MoonProvider, useMoonContext };
