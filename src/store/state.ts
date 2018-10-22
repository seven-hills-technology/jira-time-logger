import { JiraIssue } from "../models/jiraIssue";
import { JiraProject } from "../models/jiraProject";

export interface State {
    jira: StateJira
}

export interface StateJira {
    jiraProjects: JiraProject[];
    jiraIssues: JiraIssue[];
}

export const initialState: State = {
    jira: null
}