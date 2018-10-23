const jsonConfig = require("electron-json-config");

// generate jira api token at https://id.atlassian.com/manage/api-tokens
export const config = {
    jiraApiBaseUrl: process.env.JIRA_API_BASE_URL || jsonConfig.get("jiraApiBaseUrl"),
    jiraApiAuthHeaderValue: process.env.JIRA_API_AUTH_HEADER_VALUE || jsonConfig.get("jiraApiAuthHeaderValue"),
    jiraUnclassifiedIssueKey: process.env.JIRA_UNCLASSIFIED_ISSUE_KEY || jsonConfig.get("jiraUnclassifiedIssueKey"),
    redisHost: process.env.REDIS_HOST || jsonConfig.get("redisHost"),
    redisPort: process.env.REDIS_PORT || jsonConfig.get("redisPort")
}