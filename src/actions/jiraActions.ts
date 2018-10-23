import { Dispatch } from "redux";
import { jiraService } from "../services/jiraService";
import { redisJiraService } from "../services/redisJiraService";
import { jiraIssueIndexService } from "../services/jiraIssueIndexService";
import { formName as mainPageFormName } from "../containers/mainPage";
import { reset } from "redux-form";
import electron from "electron";

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
    const jiraIssues = await redisJiraService.getAllJiraIssues();
    jiraIssues.forEach(x => jiraIssueIndexService.addToIndex(x));

    dispatch({
        type: jiraActionTypes.JIRA_LOAD_ISSUES,
        payload: {jiraIssues}
    });
};

export const saveWorklog = (issueKey: string, date: Date, hours: number, comment: string) => async (dispatch: Dispatch<any>) => {
    const res = await jiraService.saveWorklog(issueKey, date, hours, comment);
    dispatch(reset(mainPageFormName));
    const remote = electron.remote;
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close();
};