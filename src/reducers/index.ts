import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { jiraReducer } from "./jiraReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    jira: jiraReducer
});