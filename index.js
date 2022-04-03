const core = require('@actions/core');
const github = require('@actions/github');
const {parseStringAsArray, fillByDefault} = require('./lib/array-utils')

const defaultRemindDays = [1, 3, 10, 30, 90];
const defaultMessage = 'It\' s time to remember this issue!';

try {
  const labels = fillByDefault(core.getInput('labels'), ['need-to-remind']);
  const remindDays = fillByDefault(
      parseStringAsArray(core.getInput('remind-days')), defaultRemindDays);
  const time = (new Date()).toTimeString();
  const message = core.getInput('message') || defaultMessage;
  console.log(`${time} ${message}`)
  console.log(`${labels}`)
  console.log(`${remindDays}`)
  for (const a of labels) {
    console.log(a)
  }
  for (const a of remindDays) {
    console.log(a)
  }
} catch (error) {
  core.setFailed(error.message);
}
