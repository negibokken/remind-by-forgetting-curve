const core = require('@actions/core');
const github = require('@actions/github');

const defaultRemindDays = [1, 3, 10, 30, 90];
const defaultMessage = 'It' s time to remember this issue!'

    try {
  const labels = core.getInput('labels');
  const remindDays = core.getInput('remind-days') || defaultRemindDays;
  const time = (new Date()).toTimeString();
  const message = core.getInput('message') || defaultMessage;
  console.log(`${time} ${message}`)
  console.log(`${labels}`)
  console.log(`${remindDays}`)
} catch (error) {
  core.setFailed(error.message);
}
