# jira-time-logger
A small electron application that allows you to quickly log time in jira without needing to use jira's slow and clumsy interface.
## Prerequisites
This application requires:
* A modern version of node (v8.3.x or higher)
* yarn package manager
* A cache of jira issues in Redis (populated by jira-issue-cacher)
## Running
### Development build:
```
yarn start
```
### Create application package:
```
yarn build # an application package will be created in the ./out directory
```