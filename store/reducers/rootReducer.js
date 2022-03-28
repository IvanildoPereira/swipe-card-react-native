import { combineReducers } from "redux";
import drawerReducer from "./drawerReducer";
import questionsReducer from "./questionsReducer";


export default combineReducers({
    drawerReducer, 
    questionsReducer
})