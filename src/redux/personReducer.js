import { personAPI } from "./../components/api/api";

const SET_PERSON = "SET_PERSON";

const UPDATE_PERSON = "UPDATE_PERSON";

let initialState = {
  person: []
};
const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSON: {
      return { ...state, person: action.person };
    }
    case UPDATE_PERSON: {
      return { ...state, person: action.person };
    }
    default:
      return state;
  }
};
export const setPerson = person => ({ type: SET_PERSON, person });
export const getPerson = id => async dispatch => {
  let response = await personAPI.getPerson(id);

  dispatch(personAPI.setPerson(response.data));
};

export default personReducer;
