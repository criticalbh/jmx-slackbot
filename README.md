# JMX Slackbot
Slackbot for interaction with JMX

##Requirements
* node v4.3.1 or higher
* jdk7
* tsc

##Setup
* Rename default.json.example under config dir to default.json and adjust your hosts and slack token.
* `npm install`
* `npm run build`

##Run
`npm run start`

##Usage
`@jmxbot: get dataSource:name=DataSource, NumActive`
