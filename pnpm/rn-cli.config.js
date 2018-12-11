const path = require('path')
const makeResolveRequest = require('./make-resolver')
const {FileStore} = require('metro-cache')
const findCacheDir = require('find-cache-dir')
const leftPad = require('left-pad')

const projectRoot = path.join(__dirname, '..')

const cacheFileStore = new FileStore({
  root: findCacheDir({name: 'metro-custom', create: true}),
})

// See https://facebook.github.io/metro/docs/en/configuration.
module.exports = {
  projectRoot: path.resolve(projectRoot),

  watchFolders: [
    path.resolve(projectRoot),
    path.join(path.resolve(projectRoot), 'node_modules'),
  ],

  cacheStores: [cacheFileStore],
  //cacheVersion
  //resetCache,
  //reporter: {update: () => {}}

  server: {
    //enhanceMiddleware: (middlware, server) => middleware,
    //enableVisualizer: true, // Install `metro-visualizer`.
  },

  transformer: {
    //enableBabelRCLookup,
    //enableBabelRuntime
  },

  resolver: {
    extraNodeModules: {},
    // NOTE: This will run for all files if watchman fails to start.
    resolveRequest: makeResolveRequest(),
    // --
    useWatchman: true,
    // TODO(vjpr): Could use this perhaps instead of patching.
    //hasteImplModulePath,
  },
}

// NOTE: There are lots of interesting settings.

// --------------------

// Time tranformation of each file.
// From https://github.com/facebook/metro/issues/253#issuecomment-422084406

const Metro = require('metro')

Metro.Logger.on('log', logEntry => {
  if (
    logEntry.action_name === 'Transforming file' &&
    logEntry.action_phase === 'end'
  ) {
    console.log(leftPad(parseInt(logEntry.duration_ms), 4), logEntry.file_name)
  }
})

// --------------------
