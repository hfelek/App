import { VALUE_CHANGE } from '../Constants/index';
import 
export function getValues(count){
    try {
      return async dispatch => {
        const res = await axios.get(`${BASE_URL}`);
        if (res.data) {
          dispatch({
            type: GET_MOVIES,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
    }
  };