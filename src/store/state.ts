import { RedisJiraIssue } from "../models/redisJiraIssue";

export interface State {
    jira: StateJira
}

export interface StateJira {
    jiraIssues: RedisJiraIssue[];
}

export const initialState: State = {
    jira: null
}