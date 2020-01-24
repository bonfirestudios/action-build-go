const core = require('@actions/core');
const github = require('@actions/github');
const { exec, spawn } = require('child-process-promise');

try {
    const versionPath = core.getInput('version-path');
    console.log('versionPath', versionPath);

    const origin = await git('remote', 'get-url', 'origin');
    console.log('origin', origin);

    const time = (new Date()).toTimeString();
    console.log('build time', time);

    const branch = await git('rev-parse', '--abbrev-ref');
    console.log('branch', branch);

    const revision = await git('rev-parse', 'HEAD');
    console.log('revision', revision);

    const revisionTime = await git('log', '-1', 'format=%cD')
    console.log('revisionTime', revisionTime);

    //console.log('::warning file=index.js,line=7,col=5::testing a warning');
    //console.log('::error file=index.js,line=7,col=5::testing an error');
} catch (error) {
    core.setFailed(error.message);
}

async function git(...args) {
    const result = await exec('git', args);
    return result.stdout.trim();
}