#! /usr/bin/env node
var shell = require('shelljs')

shell.exec('echo Starting OpenChakra server..')
shell.exec('cd node_modules/@trilogy-group/tu2k22-openchakra && pnpm start')
