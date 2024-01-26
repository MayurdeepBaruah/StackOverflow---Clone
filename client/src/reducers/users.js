const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload; // whole data
    case "UPDATE_CURRENT_USER":
      return state.map((state) =>
        state._id === action.payload._id ? action.payload : state
      ); // specific data
    default:
      return state;
  }
};
export default usersReducer;
