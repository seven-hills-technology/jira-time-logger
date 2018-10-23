# jira-time-logger
A small electron application that allows you to quickly log time in jira without needing to use jira's slow and clumsy interface.
## Prerequisites
This application requires:
* A modern version of node (v8.3.x or higher)
* yarn package manager
* A cache of jira issues in Redis (populated by jira-issue-cacher)
## Generating jira api key
* Go to https://id.atlassian.com/manage/api-tokens
* Add api token
* Generate a base 64 hash of "${jira_account_email}:${jira_api_token}"
## Updating config file
You may need to run the application once to generate the directory structure for the application. Put the following in ~/Library/Application Support/jira-time-logger/config.json:
```
{
    "jiraApiBaseUrl": "https://${org_specific_jira_subdomain}.atlassian.net/rest/api/3",
    "jiraApiAuthHeaderValue": "Basic ${base_64_encoded_jira_key}",
    "jiraUnclassifiedIssueKey": "${issue_key_for_issue_to_put_unclassified_worklogs}"
}
```
## Running
### Development build:
```
yarn start
```
### Create application package:
```
yarn build
mv out/jira-time-logger-${build_architecture}/jira-time-logger.app ~/Applications
```
This application works best by starting it using spotlight search!