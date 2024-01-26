// storing of data in the react app 
import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentuser";
import questionsReducer from "./questions";
import usersReducer from "./users";
export default combineReducers ({
    authReducer,
    currentUserReducer,
    questionsReducer,
    usersReducer
})