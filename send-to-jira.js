const opn = require('opn')
const request = require('request')
const settings = require('./settings')

const sendToJira = (formData, updateExistingIssue = null) => {
  const options = {
    url: `${settings.jira.url}/jira/rest/api/2/issue/`,
    method: 'POST',
    headers: {
      'A': null,
      'Content-Type': 'application/json',
      'Authorization': settings.jira.basicAuth,
      'Content-Length': Buffer.byteLength(JSON.stringify(formData)),
    },
    json: formData,
  }

  if (updateExistingIssue) {
    options.url += updateExistingIssue
    options.method = 'PUT'
  }

  const cb = (error, response, body) => {
    if (error) {
      console.log('error:', error)
    } else {
      body = typeof body !== 'string' ? body : JSON.parse(body)
      if (!body) {
        console.log('Done!')
        return
      }

      if (body && (body.errors || body.errorMessages)) {
        let errors = ''
        for (let e in body.errors) {
          errors += `${e}: ${body.errors[e]}<br />`
        }
        for (let e in body.errorMessages) {
          errors += `${e}: ${body.errorMessages[e]}<br />`
        }
        console.log('Errors:', errors)
      } else {
        console.log(`Meta: ${settings.jira.url}/jira/rest/api/2/issue/${body.key}/editmeta`)
        opn(`${settings.jira.url}/browse/${body.key}`)
      }
    }

  }

  request(options, cb)
}

module.exports = sendToJira
