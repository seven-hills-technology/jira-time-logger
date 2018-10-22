import {initialState, StateJira} from "../store/state";
import {jiraActionTypes} from "../actions/jiraActions";

export function jiraReducer(state = initialState.jira, action: {type: string, payload: any}): StateJira {
    switch (action.type) {
        case jiraActionTypes.JIRA_LOAD_PROJECTS: {
            const {jiraProjects} = action.payload;
            return Object.assign({}, state, {jiraProjects});
        }

        case jiraActionTypes.JIRA_LOAD_ISSUES: {
            const {jiraIssues} = action.payload;
            return Object.assign({}, state, {jiraIssues});
        }

        default: {
            return state;
        }
    }
}