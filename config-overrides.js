const { override, addBundleVisualizer } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

/* config-overrides.js */
module.exports = override(
  addReactRefresh({ disableRefreshCheck: true }),
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
)
