const { override } = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");

/* config-overrides.js */
module.exports = override(addReactRefresh({ disableRefreshCheck: true }));
