module.exports = {
  hooks: {readPackage},
}

function readPackage(pkg, {log}) {

  if (pkg.name === 'expo-asset') {
    pkg.dependencies['expo-constants'] = '*'
  }

  if (pkg.name === 'expo-gl') {
    pkg.dependencies['prop-types'] = '*'
  }

  // TODO(vjpr): fbjs added as a root dep so not needed anymore.
  //   It was needed by a bunch of things.

  if (pkg.name === 'expo') {
    pkg.dependencies['fbjs'] = '*'
  }

  if (pkg.name === 'react-native-gesture-handler') {
    pkg.dependencies['fbjs'] = '*'
  }

  // --------------------

  if (pkg.name === 'react-native') {
    pkg.dependencies['schedule'] = '*'
  }

  // ---------------------

  if (pkg.dependencies && Object.keys(pkg.dependencies).includes('metro')) {
    // NOTE: Git deps can't be used because its a monorepo.
    //   'github:vjpr/metro#fe51dd0f6a2bb08ce07043edf2ffb935033f9ddc'
    //pkg.dependencies['metro'] = 'npm:metro-pnpm@0.45.6-vjpr.3'
  }

  // ---------------------

  return pkg
}
