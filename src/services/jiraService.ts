declare const JIRA_API_BASE_URL: string;
declare const JIRA_API_AUTH_HEADER_VALUE: string;
declare const JIRA_UNCLASSIFIED_ISSUE_KEY: string;

import axiosStatic from "axios";
import moment from "moment";
import request from "request";
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

    async saveWorklog(issueKey: string, date: Date, hours: number, comment: string) {
        issueKey = issueKey || JIRA_UNCLASSIFIED_ISSUE_KEY;
        const startDate = moment(date).startOf("day").format("YYYY-MM-DDTHH:mm:ss.000ZZ");
        const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss.000ZZ");
        const timeSpentSeconds= hours * 60 * 60;
        const body = {
            "comment": {
                "type": "doc",
                "version": 1,
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "type": "text",
                                "text": comment
                            }
                        ]
                    } 
                ]
            },
            "created": currentDate,
            "updated": currentDate,
            "started": startDate,
            "timeSpentSeconds": timeSpentSeconds
              
        }
        //return await axios.post(`issue/${issueKey}/worklog`, body);
        return await request({
            url: `${JIRA_API_BASE_URL}/issue/${issueKey}/worklog`,
            method: "POST",
            headers: {
                Authorization: JIRA_API_AUTH_HEADER_VALUE
            },
            json: true,
            body
        });
    }
}

export const jiraService = new JiraService();