const core = require('@actions/core');
const { spawn } = require('child_process');

try {
    const versionPath = core.getInput('version-path');
    console.log('versionPath', versionPath);

    const repository = core.getInput('repository');
    console.log('repository', repository);

    const branch = core.getInput('branch');
    console.log('branch', branch);

    const revision = core.getInput('revision');
    console.log('revision', revision);

    const time = (new Date()).toTimeString();
    console.log('build time', time);

    const go = spawn('go', ['build', '-v', `ldflags=-X "${versionPath}.origin=git@github.com:${repository}" -X "${versionPath}.branch=${branch}" -X "${versionPath}.revision=${revision}" -X "${versionPath}.version=${revision.slice(0, 7)}" -X "${versionPath}.buildTime=${time}`]);
    go.stdout.on('data', data => {
        console.log(data);
    });
    go.stderr.on('data', data => {
        console.warning(data);
    });
    go.on('error', error => {
        core.setFailed(`spawn failed ${error.message}`);
    });
    go.on('close', code => {
        if (code != 0) {
            core.setFailed(`go build returned ${code}`);
        }
    });

} catch (error) {
    core.setFailed(error.message);
}
