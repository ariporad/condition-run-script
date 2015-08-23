const proxyquire = require('proxyquire')
const { test } = require('tap')

const child_processes = []
const resolves = []
const stats = []

function makeStatObject (isFile = true) {
  isFile = !!isFile
  return {
    isFile: () => isFile,
    isDirectory: () => !isFile
  }
}

const condition = proxyquire('../../', {
  child_process: {
    exec: (cmd, cb) => child_processes.shift()(cmd, cb)
  },
  path: {
    resolve: (p) => resolves.shift()(p)
  },
  fs: {
    stat: (p) => stats.shift()
  }
})

test('run-script', (t) => {
  t.test('calls the plugin', (tt) => {
    let cpCalled = 0
    child_processes.push((cmd, cb) => {
      cpCalled++
      cb(null, '', '')
    })

    stats.push(() => makeStatObject(false))
    resolves.push(() => '/doesnt/exist')

    condition({
      script: 'rm -rf /'
    }, {}, (err) => {
      tt.error(err)
      tt.is(cpCalled, 1)
    })
  })

  t.test('doesn\'t convert commands to paths', (tt) => {
    child_processes.push((cmd, cb) => {
      tt.is(cmd, 'rm -rf /')
      cb(null, '', '')
    })

    stats.push(() => makeStatObject(false))
    resolves.push(() => '/doesnt/exist')

    condition({
      script: 'rm -rf /'
    }, {}, (err) => {
      tt.error(err)
    })
  })

  t.test('converts paths to absolute paths', (tt) => {
    const fakeDirname = '/semantic-release/condtion-run-script/test'
    child_processes.push((cmd, cb) => {
      tt.is(fakeDirname + '/' + 'test.sh')
      cb(null, '', '')
    })

    stats.push(() => makeStatObject(true))
    resolves.push((p) => fakeDirname + '/' + p)

    condition({
      script: 'test.sh'
    }, {}, (err) => {
      tt.error(err)
    })
  })

  t.test('includes the output of the failed script and the exit code', (tt) => {
    const stdout = 'Blah blah blah'
    const stderr = 'everything is broken'
    const errMsg = 'something bad happened'
    const errCode = 123
    child_processes.push((cmd, cb) => {
      const err = new Error(errMsg)
      err.code = errCode
      cb(err, stdout, stderr)
    })

    stats.push(() => makeStatObject(true))
    resolves.push((p) => '/semantic-release/testing/' + p)

    condition({
      script: 'test.sh'
    }, {}, (err) => {
      tt.isNot(err.code.indexOf(errCode), -1)
      tt.isNot(err.message.indexOf(stdout), -1)
      tt.isNot(err.message.indexOf(stderr), -1)
    })
  })
})
