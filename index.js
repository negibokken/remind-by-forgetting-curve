const core = require('@actions/core');
const github = require('@actions/github');
const {Octokit} = require('@octokit/rest');
const {parseStringAsArray, fillByDefault} = require('./lib/array-utils')
const dayjs = require('dayjs')

const defaultRemindDays = [1, 3, 10, 30, 90];
const defaultMessage = 'It\' s time to remember this issue!';

const token = core.getInput('repo-token', {required: true})
const octokit = new Octokit({auth: token});

(async () => {
  try {
    const labels = fillByDefault(
        parseStringAsArray(core.getInput('labels')), ['need-to-remind']);
    const remindDays = fillByDefault(
        parseStringAsArray(core.getInput('remind-days')), defaultRemindDays);
    const time = dayjs().format('YYYY-MM-DD')
    const message = core.getInput('message') || defaultMessage;
    const labelsSet = new Set(labels);
    const issues = await octokit.paginate(
        octokit.rest.issues.listForRepo, {owner: 'negibokken', repo: 'bokken'})

    const targetIssues = issues.filter((i) => {
      for (const label of i.labels) {
        if (labelsSet.has(label.name)) {
          return true
        }
      }
      return false;
    });

    for await (const issue of targetIssues) {
      for await (const remindDay of remindDays) {
        const d =
            dayjs(issue.created_at).add(remindDay, 'day').format('YYYY-MM-DD')
        console.log(d, time)
        if (d === time) {
          const repoparts = (issue.repository_url.split('/'));
          const n = repoparts.length;
          const ownerName = repoparts[n - 1];
          const repoName = repoparts[n - 2];
          const assignee =
              issue.assignee ? `@${issue.assignee} ` : `@${issue.user.login} `;
          console.log(repoparts, ownerName, repoName, assignee);
          await octokit.rest.issues.createComment({
            owner: ownerName,
            repo: repoName,
            issue_number: issue.number,
            body: `${assignee}It's time to remind this issue`,
          });
        }
      }
    }

    // console.log(targetIssues)
    console.log(`${time} ${message}`)
    console.log(`${labels}`)
    console.log(`${remindDays}`)
  } catch (error) {
    core.setFailed(error.message);
  }
})()
