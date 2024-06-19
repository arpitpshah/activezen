// workshopActions.js
import axios from 'axios';
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


export const listWorkshops = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: WORKSHOP_LIST_REQUEST });

    const { data } = await axios.get(`https://dvrl380ud0.execute-api.us-east-1.amazonaws.com/stage/workshops?keywords=${keyword}`);
    
    dispatch({
      type: WORKSHOP_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.error('API call failed:', error);
    dispatch({
      type: WORKSHOP_LIST_FAIL,
      payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
    });
  }
};

export const getWorkshopDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORKSHOP_DETAILS_REQUEST });
    
    const { data } = await axios.get(`https://dvrl380ud0.execute-api.us-east-1.amazonaws.com/stage/workshops/${id}`);
    

    dispatch({
      type: WORKSHOP_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.error('API call failed:', error);
    dispatch({
      type: WORKSHOP_DETAILS_FAIL,
      payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
    });
  }
};

export const getLocationDetails = (sport, country) => async (dispatch) => {
  try {
    
    dispatch({ type: LOCATION_DETAILS_REQUEST });

    const { data } = await axios.get(`https://dzomxfjyq1.execute-api.us-east-1.amazonaws.com/dev-env/location?sport=${sport}&country=${country}`);
    dispatch({
      type: LOCATION_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOCATION_DETAILS_FAIL,
      payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
    });
  }
};

export const getHobbyDetails = (hobby) => async (dispatch) => {
  try {
    dispatch({ type: HOBBY_DETAILS_REQUEST });

    const { data } = await axios.get(`https://34kremxbzd.execute-api.us-east-1.amazonaws.com/dev/levelcheck?hobby=${hobby}`);
    dispatch({
      type: HOBBY_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: HOBBY_DETAILS_FAIL,
      payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
    });
  }
};

export const resetWorkshopDetails = () => {
  return { type: WORKSHOP_DETAILS_RESET };
};
