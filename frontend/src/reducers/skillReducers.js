// workshopReducers.js
import {
    SKILL_LIST_REQUEST,
    SKILL_LIST_SUCCESS,
    SKILL_LIST_FAIL,
    SKILL_DETAILS_REQUEST,
    SKILL_DETAILS_SUCCESS,
    SKILL_DETAILS_FAIL,
    SKILL_DETAILS_RESET
  } from '../constants/skillConstants';
  
  export const skillListReducer = (state = { skills: [] }, action) => {
    switch (action.type) {
      case SKILL_LIST_REQUEST:
        return { loading: true, skills: [] };
      case SKILL_LIST_SUCCESS:
        return { loading: false, skills: action.payload };
      case SKILL_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const skillDetailsReducer = (state = { skillDetails: { reviews:[] } }, action) => {
    switch (action.type){
        case SKILL_DETAILS_REQUEST:
            return { loading: true, ...state }
        case SKILL_DETAILS_SUCCESS:
            return { loading: false, skillData: action.payload }
        case SKILL_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case SKILL_DETAILS_RESET:
            return { skillData: {} }; // Reset the state
        default:
            return state
    }
}
  