import moment from "moment";
import request from "request-promise";
import { config } from "../config"

class JiraService {
    async saveWorklog(issueKey: string, date: Date, hours: number, comment: string) {
        issueKey = issueKey || config.jiraUnclassifiedIssueKey;
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

        try {
            const res = await request({
                url: `${config.jiraApiBaseUrl}/issue/${issueKey}/worklog`,
                method: "POST",
                headers: {
                    Authorization: config.jiraApiAuthHeaderValue
                },
                json: true,
                body
            });
            console.log("successful request");
            return res;
        } catch (e) {
            console.error("unsuccessful request", e);
        }
    }
}

export const jiraService = new JiraService();