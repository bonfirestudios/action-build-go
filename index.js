const core = require('@actions/core');
const github = require('@actions/github');

try {
    const versionPath = core.getInput('version-path');
    const time = (new Date()).toTimeString();
    console.log('::warning file=index.js,line=7,col=5::testing a warning');
    console.log('::error file=index.js,line=7,col=5::testing an error');
} catch (error) {
    core.setFailed(error.message);
}