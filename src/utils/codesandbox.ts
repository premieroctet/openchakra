import { getParameters } from 'codesandbox/lib/api/define'

export const buildParameters = (code: string): string => {
  return getParameters({
    files: {
      'public/index.html': {
        content: `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="theme-color" content="#000000">
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
	<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	<title>React App</title>
</head>

<body>
	<noscript>
		You need to enable JavaScript to run this app.
	</noscript>
	<div id="root"></div>
</body>

</html>`,
        isBinary: false,
      },
      'index.js': {
        content: `import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
`,
        isBinary: false,
      },
      'App.js': {
        content: code,
        isBinary: false,
      },
      'package.json': {
        content: `{
  "name": "react",
  "version": "1.0.0",
  "description": "",
  "keywords": [],
  "main": "src/index.js",
  "dependencies": {
    "@chakra-ui/react": "^1.0.1",
    "@chakra-ui/icons": "^1.0.1",
    "@emotion/react": "^11.1.1",
    "@emotion/styled": "^11.0.0",
    "framer-motion": "^2.9.4",
    "react": "16.12.0",
    "react-dom": "16.12.0",
    "react-scripts": "3.0.1"
  },
  "devDependencies": {
    "typescript": "3.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}`,
        isBinary: false,
      },
    },
  })
}
