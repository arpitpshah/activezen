// workshopReducers.js
import {
    WORKSHOP_DETAILS_REQUEST,
    WORKSHOP_DETAILS_SUCCESS,
    WORKSHOP_DETAILS_FAIL,
    WORKSHOP_LIST_REQUEST,
    WORKSHOP_LIST_SUCCESS,
    WORKSHOP_LIST_FAIL,
    LOCATION_DETAILS_REQUEST,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAIL,
    WORKSHOP_DETAILS_RESET,
    HOBBY_DETAILS_REQUEST,
    HOBBY_DETAILS_SUCCESS,
    HOBBY_DETAILS_FAIL
  } from '../constants/workshopConstants';
  
  export const workshopListReducer = (state = { workshops: [] }, action) => {
    switch (action.type) {
      case WORKSHOP_LIST_REQUEST:
        return { loading: true, workshops: [] };
      case WORKSHOP_LIST_SUCCESS:
        return { loading: false, workshops: action.payload };
      case WORKSHOP_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const workshopDetailsReducer = (state = { workshop: [] }, action) => {
    switch (action.type) {
      case WORKSHOP_DETAILS_REQUEST:
        return { loading: true, ...state };
      case WORKSHOP_DETAILS_SUCCESS:
        return { loading: false, workshop: action.payload };
      case WORKSHOP_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case WORKSHOP_DETAILS_RESET:
          return { workshop: {} }; // Reset the state
      default:
        return state;
    }
  };

  export const locationDetailsReducer = (state = { locations: [] }, action) => {
    switch (action.type) {
      case LOCATION_DETAILS_REQUEST:
        return { loading: true, locations: [] };
      case LOCATION_DETAILS_SUCCESS:
        return { loading: false, locations: action.payload };
      case LOCATION_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const hobbyDetailsReducer = (state = { hobbies: [] }, action) => {
    switch (action.type) {
      case HOBBY_DETAILS_REQUEST:
        return { loading: true, ...state };
      case HOBBY_DETAILS_SUCCESS:
        return { loading: false, hobbies: action.payload };
      case HOBBY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  