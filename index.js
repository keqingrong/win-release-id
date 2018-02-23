'use strict';
const {
  execSync
} = require('child_process');

// Reference: https://stackoverflow.com/questions/38935715/get-windows-10-build-version-release-id
const getWinReleaseId = () => {
  const cmd = 'reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "ReleaseId"';
  try {
    const output = execSync(cmd, {
      encoding: 'utf-8'
    }).replace(/[^\d]/g, '');
    return parseInt(output, 10);
  } catch (err) {
    return -1;
  }
}

module.exports = getWinReleaseId;
