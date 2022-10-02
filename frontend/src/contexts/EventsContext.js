import dayjs from 'dayjs';
import React, { createContext, useContext, useReducer } from 'react';

export const EventsContext = createContext();

// Initial state

const initialState = {
  startDate: dayjs('1972-04-01'),
  endDate: dayjs('1972-10-01'),
  types: ['A', 'M', 'H', 'C', 'Z', 'L', 'S'],
  events: [],
  count: 0,
  page: 1,
  selectedEvent: null,
  loading: true,
};

// Actions

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_TYPES = 'SET_TYPES';
export const SET_EVENTS = 'SET_EVENTS';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const SET_LOADING = 'SET_LOADING';

// Action creators

export function setDateRange(dateRange) {
  return { type: SET_DATE_RANGE, dateRange };
}

export function setTypes(types) {
  return { type: SET_TYPES, types };
}

export function setEvents(events, count) {
  return { type: SET_EVENTS, events, count };
}

export function incrementPage() {
  console.log('incrementPage', incrementPage);
  return { type: INCREMENT_PAGE };
}

export function setSelectedEvent(event) {
  return { type: SET_SELECTED_EVENT, event };
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}

// Reducers

export function EventReducer(state, action) {
  switch (action.type) {
    case SET_DATE_RANGE:
      return {
        ...state,
        startDate: action.dateRange[0],
        endDate: action.dateRange[1],
        count: initialState.count,
        page: initialState.page,
        selectedEvent: initialState.selectedEvent,
        loading: true,
      };
    case SET_TYPES:
      return {
        ...state,
        types: action.types,
        count: initialState.count,
        page: initialState.page,
        selectedEvent: initialState.selectedEvent,
        loading: true,
      };
    case SET_EVENTS:
      return {
        ...state,
        events:
          state.page === 1
            ? action.events
            : [...state.events, ...action.events],
        count: action.count,
        loading: false,
      };
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.event,
      };
    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
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
