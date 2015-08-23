const SRError = require('@semantic-release/error')
const { exec } = require('child_process')
const { resolve } = require('path')
const { stat } = require('fs')

module.exports = function ({ script }, config, cb) {
  if (!script) return cb(new SRError('No script provided', 'ENOSCRIPT'))

  // If script is the path to a script, run it. Otherwise, it's a command.
  const scriptPath = resolve(script)
  stat(scriptPath, (err, stat) => {
    if (err) return cb(err)

    let command = script
    if (stat.isFile()) command = scriptPath

    exec(command, (err, stdout, stderr) => {
      let scriptOutput = ''
      if (String(stdout)) {
        scriptOutput += '\n\n'
        scriptOutput += String(stdout)
      }
      if (String(stderr)) {
        scriptOutput += '\n\n'
        scriptOutput += String(stderr)
      }

      if (err) {
        return cb(new SRError(
          `Script Exited with non-zero status: ${scriptOutput}`,
          `ESCRIPTEXIT${err.code}`
        ))
      }

      return cb(null)
    })
  })
}
