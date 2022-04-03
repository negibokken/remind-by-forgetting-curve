const labels = new Set(['need-to-remind']);
const issues = [{labels: [{name: ''}]}, {labels: [{name: 'need-to-remind'}]}];
const targetIssues = issues.filter((i) => {
  for (const label of i.labels) {
    if (labels.has(label.name)) {
      return true
    }
  }
  return false;
});
console.log(targetIssues)
