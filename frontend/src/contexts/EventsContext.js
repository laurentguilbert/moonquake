import dayjs from 'dayjs';
import React, { createContext, useContext, useReducer } from 'react';

export const EventsContext = createContext();

// Initial state

const initialState = {
  startDate: dayjs('1969-07-01'),
  endDate: dayjs('1969-12-31'),
  types: ['A', 'M', 'H', 'C', 'Z', 'L', 'S', 'U'],
  events: [],
  selectedEvent: null,
};

// Actions

export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_TYPES = 'SET_TYPES';
export const SET_EVENTS = 'SET_EVENTS';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';

// Action creators

export function setStartDate(date) {
  return { type: SET_START_DATE, date };
}

export function setEndDate(date) {
  return { type: SET_START_DATE, date };
}

export function setTypes(types) {
  return { type: SET_TYPES, types };
}

export function setEvents(events) {
  return { type: SET_EVENTS, events };
}

export function setSelectedEvent(event) {
  return { type: SET_SELECTED_EVENT, event };
}

// Reducers

export function EventReducer(state, action) {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.date,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.date,
      };
    case SET_TYPES:
      return {
        ...state,
        types: action.types,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.event,
      };
    default:
      return state;
  }
}

function EventProvider(props) {
  const [state, dispatch] = useReducer(EventReducer, initialState);
  return <EventsContext.Provider value={{ state, dispatch }} {...props} />;
}

function useEventsContext() {
  return useContext(EventsContext);
}

export { EventProvider, useEventsContext };