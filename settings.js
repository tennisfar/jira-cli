module.exports = {
  jira: {
    basicAuth: 'Basic XXXXXXXXXXXXXXXXXXXX',
    board: 'Web BAU',
    projectKey: 'IU',
    url: 'https://jira.xxx.com',
  }
}

/*
 * For Jira Basic Auth, go to https://www.base64decode.org/ and encode
 * your Jira login and password like this: login:password
 * Then prefix it with 'Basic', add it instead of the XXXX's:
 * 
 *      basicAuth: 'Basic XXXXXXXXXXXXXXXXXXXX'
 * 
 */