// workshopActions.js
import axios from 'axios';
import { SKILL_LIST_FAIL, SKILL_LIST_REQUEST, SKILL_LIST_SUCCESS, SKILL_DETAILS_FAIL, SKILL_DETAILS_REQUEST, SKILL_DETAILS_SUCCESS, SKILL_DETAILS_RESET} from '../constants/skillConstants';

const url = 'http://activezen-backend.us-east-1.elasticbeanstalk.com/'
export const listSkills = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: SKILL_LIST_REQUEST });

    const { data } = await axios.get(`${url}api/skills`);
    
    dispatch({
      type: SKILL_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.error('API call failed:', error);
    dispatch({
      type: SKILL_LIST_FAIL,
      payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message
    });
  }
};

export const listSkillById = (id) => async(dispatch) => {
  try {
      dispatch({
          type: SKILL_DETAILS_REQUEST
      })

      const { data } = await axios.get(`${url}api/skills/${id}`)
      
      dispatch({
          type: SKILL_DETAILS_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type: SKILL_DETAILS_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
  }
}

export const resetSkillDetails = () => {
  return { type: SKILL_DETAILS_RESET };
};
