'use strict';
const os = require('os');
const {
  execSync
} = require('child_process');

// Reference:
// https://docs.microsoft.com/en-us/windows/release-information/
// https://en.wikipedia.org/wiki/Windows_10
// [buildNumber, releaseId]
const releaseInfo = new Map([
  [19042, 2009], // 20H2, October 2020 Update
  [19041, 2004], // 20H1, May 2020 Update
  [18363, 1909], // 19H2, November 2019 Update
  [18362, 1903], // 19H1, May 2019 Update
  [17763, 1809], // Redstone 5, October 2018 Update
  [17134, 1803], // Redstone 4, April 2018 Update
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

const getWinReleaseId = (release) => {
  // Windows version form: `<major version>.<minor version>.<build number>.<revision>`
  const osRelease = (release || os.release()).split('.');
  const buildNumber = parseInt(osRelease[2], 10);
  const releaseId = releaseInfo.get(buildNumber);
  if (releaseId) {
    return releaseId;
  }
  if (release) {
    const majorVersion = parseInt(osRelease[0], 10);
    // before Windows 10
    if (majorVersion < 10) {
      return -1;
    }
    // future Windows
    // TODO: To be updated...
    return -1;
  }
  if (process.platform !== 'win32') {
    return -1;
  }
  // Use getReleaseIdWithCmd for Windows 10 Insider Preview or the future version
  return getReleaseIdWithCmd();
}

module.exports = getWinReleaseId;
