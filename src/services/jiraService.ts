declare const JIRA_API_BASE_URL: string;
declare const JIRA_API_AUTH_HEADER_VALUE: string;

import axiosStatic from "axios";
import { JiraIssue } from "../models/jiraIssue";
import { JiraProject } from "../models/jiraProject";
const axios = axiosStatic.create({baseURL: JIRA_API_BASE_URL});

axios.interceptors.request.use(config => {
    config.headers.Authorization = JIRA_API_AUTH_HEADER_VALUE;
    config.headers.Accept = "application/json";
    return config;
})

class JiraService {
    async getAllJiraProjects(): Promise<JiraProject[]> {
        const res = await axios.get<JiraProject[]>(`project`);
        return res.data;
    }

    async getAllJiraIssues(): Promise<JiraIssue[]> {
        const maxResults = 100;
        let allResults: JiraIssue[] = [];
        let resultsBatch: JiraIssue[] = null;

        for (let startAt = 0; resultsBatch == null || resultsBatch.length == maxResults; startAt += maxResults) {
            console.log(startAt);
            const res = await axios.get<any>(`search?startAt=${startAt}&maxResults=${maxResults}`);
            resultsBatch = res.data.issues;
            allResults = [...allResults, ...resultsBatch];
        }

        return allResults;
    }
}

export const jiraService = new JiraService();