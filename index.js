const core = require('@actions/core');
const github = require('@actions/github');
const { spawn } = require('child_process');

try {
    const versionPath = core.getInput('version-path');
    console.log('versionPath', versionPath);

    const workingDirectory = core.getInput('working-directory');
    console.log('workingDirectory', workingDirectory);

    const time = (new Date()).toUTCString();
    console.log('build time', time);

    const go = spawn(
        'go', [
        'build',
        '-v',
        `-ldflags=-X "${versionPath}.origin=git@github.com:${github.context.repo}" -X "${versionPath}.branch=${github.context.ref}" -X "${versionPath}.revision=${github.context.sha}" -X "${versionPath}.version=${github.context.sha.slice(0, 7)}" -X "${versionPath}.buildTime=${time}"`
    ], { stdio: ['ignore', 'inherit', 'inherit'], cwd: workingDirectory });
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
