declare const JIRA_API_BASE_URL: string;
declare const JIRA_API_AUTH_HEADER_VALUE: string;
declare const JIRA_UNCLASSIFIED_ISSUE_KEY: string;

import axiosStatic from "axios";
import moment from "moment";
import request from "request-promise";
import { JiraIssue } from "../models/jiraIssue";
import { JiraProject } from "../models/jiraProject";
const axios = axiosStatic.create({baseURL: JIRA_API_BASE_URL});

axios.interceptors.request.use(config => {
    config.headers.Authorization = JIRA_API_AUTH_HEADER_VALUE;
    config.headers.Accept = "application/json";
    return config;
})

class JiraService {
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

        const res = await request({
            url: `${JIRA_API_BASE_URL}/issue/${issueKey}/worklog`,
            method: "POST",
            headers: {
                Authorization: JIRA_API_AUTH_HEADER_VALUE
            },
            json: true,
            body
        });
        return res;
    }
}

export const jiraService = new JiraService();