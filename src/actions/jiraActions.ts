import { Dispatch } from "redux";
import { jiraService } from "../services/jiraService";
import { jiraIssueIndexService } from "../services/jiraIssueIndexService";

export enum jiraActionTypes {
    JIRA_LOAD_PROJECTS = "JIRA_LOAD_PROJECTS",
    JIRA_LOAD_ISSUES = "JIRA_LOAD_ISSUES"
};

export const loadAllJiraProjects = () => async (dispatch: Dispatch<any>) => {
    const jiraProjects = await jiraService.getAllJiraProjects();

    dispatch({
        type: jiraActionTypes.JIRA_LOAD_PROJECTS,
        payload: {jiraProjects}
    });
};

export const loadAllJiraIssues = () => async (dispatch: Dispatch<any>) => {
    const jiraIssues = await jiraService.getAllJiraIssues();
    jiraIssues.map(x => ({id: x.key, key: x.key, project: x.fields.project.name, summary: x.fields.summary})).forEach(x => jiraIssueIndexService.addToIndex(x));

    dispatch({
        type: jiraActionTypes.JIRA_LOAD_ISSUES,
        payload: {jiraIssues}
    });
};