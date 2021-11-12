const core = require('@actions/core')
const exec = require('@actions/exec')

const { RefKey } = require('./constants')

function isGhes () {
  const ghUrl = new URL(process.env.GITHUB_SERVER_URL || 'https://github.com')
  return ghUrl.hostname.toUpperCase() !== 'GITHUB.COM'
}

function logWarning (message) {
  const warningPrefix = '[warning]'
  core.info(`${warningPrefix}${message}`)
}

function isValidEvent () {
  return RefKey in process.env && Boolean(process.env[RefKey])
}

async function runRushBuild (versionPolicy) {
  return exec.exec('node', ['common/scripts/install-run-rush.js', 'build', '--to-version-policy', versionPolicy])
}

function loadRushJson () {
  const rushJsonPath = './rush.json'
  try {
    return require(rushJsonPath)
  } catch (e) {
    throw new Error(`Failed to load rush.json. ${e.message}`)
  }
}

module.exports = {
  isGhes,
  logWarning,
  isValidEvent,
  loadRushJson,
  runRushBuild
}