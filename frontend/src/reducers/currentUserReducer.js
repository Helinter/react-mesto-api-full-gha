// currentUserReducer.js
const initialState = {
  _id: '',
  name: '',
  about: '',
  avatar: '',
  email: '',
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'currentUser/setCurrentUser':
      console.log('setCurrentUser action:', action);
      console.log('Current state:', state);
      console.log('Payload:', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default currentUserReducer;
