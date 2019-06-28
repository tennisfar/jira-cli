const inquirer = require('inquirer')
const sendToJira = require('./send-to-jira')
const settings = require('./settings')

var questions = [{
    type: 'list',
    name: 'type',
    message: 'Issue type?',
    choices: [
      'Task',
      'Bug',
      'Technical task'
    ]
  },
  {
    type: 'input',
    name: 'parent',
    message: 'Parent issue?',
    default: '',
    validate(input) {
      return input.length > 0
    },
    when(answers) {
      return answers.type === 'Technical task'
    }
  },
  {
    type: 'input',
    name: 'summary',
    message: 'Summary?',
    default: '',
    validate(input) {
      return input.length > 0
    }
  },
  // {
  //   type: 'list',
  //   name: 'storypoints',
  //   message: 'Story points?',
  //   choices: [
  //     '0',
  //     '0.5',
  //     '1',
  //     '2',
  //     '3',
  //     '5',
  //     '8',
  //     '13',
  //     '20',
  //   ]
  // },
  {
    type: 'list',
    name: 'assignee',
    message: 'Assignee?',
    choices: [
      'ekmlpe',
      'Unassigned',
    ]
  },
  {
    type: 'checkbox',
    message: 'Labels',
    name: 'labels',
    choices: [{
        name: 'Frontend',
        checked: true
      },
      {
        name: 'Backend'
      },
      {
        name: 'Avalon'
      },
      {
        name: 'Cards'
      },
      {
        name: 'Dokumentation'
      },
    ],
  },
  {
    type: 'list',
    name: 'pulje',
    message: 'Pulje?',
    choices: [
      'DLI',
      'DLO',
      'Tværgående'
    ]
  },
  {
    type: 'list',
    name: 'projektnr',
    message: 'Projektnr?',
    choices: [
      '03.00437 BAU Digital and Ecommerce',
      // '03.00385.05 Bingo',
    ]
  },
];

console.clear()
inquirer.prompt(questions).then(answers => letsGoJira(answers))

const letsGoJira = (answers) => {
  let formData = {
    'fields': {
      'project': {
        'key': settings.jira.projectKey,
      },
      'summary': answers.summary,
      'customfield_11400': {
        'value': settings.jira.board,
      },
      'assignee': {
        'name': answers.assignee === 'Unassigned' ? '' : answers.assignee
      },
      'labels': answers.labels,
      'issuetype': {
        'name': answers.type
      },
      'customfield_12229': {
        'value': answers.pulje
      },
      'customfield_13100': {
        value: answers.projektnr
      },
      // 'customfield_10003': parseFloat(answers.storypoints)
    }
  }

  if (answers.parent) {
    formData.fields.parent = {
      'key': answers.parent
    }
  }

  // sendToJira(formData, 'IU-11829')
  sendToJira(formData)
}