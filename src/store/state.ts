import { JiraProject } from "../models/jiraProject";
import { RedisJiraIssue } from "../models/redisJiraIssue";

export interface State {
    jira: StateJira
}

export interface StateJira {
    jiraProjects: JiraProject[];
    jiraIssues: RedisJiraIssue[];
}

export const initialState: State = {
    jira: null
}