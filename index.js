'use strict';
const os = require('os');
const {
  execSync
} = require('child_process');

// Reference:
// https://technet.microsoft.com/en-us/windows/release-info.aspx
// http://windows.microsoft.com/en-us/windows-10/update-history-windows-10
// https://en.wikipedia.org/wiki/Windows_10
// [buildNumber, releaseId]
const releaseInfo = new Map([
  [17604, 1809], // Redstone 5
  [17101, 1803], // Redstone 4
  [16299, 1709], // Redstone 3, Fall Creators Update
  [15063, 1703], // Redstone 2, Creators Update
  [14393, 1607], // Redstone 1, Anniversary Update
  [10586, 1511], // Threshold 2, November Update
  [10240, 1507] // Threshold 1
]);

// Reference: https://stackoverflow.com/questions/38935715/get-windows-10-build-version-release-id
const getReleaseIdWithCmd = () => {
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

const getWinReleaseId = () => {
  if (process.platform !== 'win32') {
    return -1;
  }
  // Windows version form: `<major version>.<minor version>.<build number>.<revision>`
  const osRelease = os.release().split('.');
  const buildNumber = parseInt(osRelease[2], 10);
  // Use getReleaseIdWithCmd for Windows 10 Insider Preview or the future version
  return releaseInfo.get(buildNumber) || getReleaseIdWithCmd();
};

module.exports = getWinReleaseId;
