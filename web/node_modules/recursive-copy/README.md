# recursive-copy
[![npm version](https://img.shields.io/npm/v/recursive-copy.svg)](https://www.npmjs.com/package/recursive-copy)
![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg)
[![Build Status](https://travis-ci.org/timkendrick/recursive-copy.svg?branch=master)](https://travis-ci.org/timkendrick/recursive-copy)
[![Windows Build Status](https://img.shields.io/appveyor/ci/timkendrick/recursive-copy/master.svg?label=windows%20build)](https://ci.appveyor.com/project/timkendrick/recursive-copy/branch/master)

> Simple, flexible file copy utility


## Features

- Recursively copy whole directory hierarchies
- Choose which files are copied by passing a filter function, regular expression or glob
- Rename files dynamically, including changing the output path
- Transform file contents using streams
- Choose whether to overwrite existing files
- Choose whether to copy system files
- Filters out [junk](https://www.npmjs.com/package/junk) files by default
- Uses [graceful-fs](https://www.npmjs.com/package/graceful-fs) and [mkdirp](https://www.npmjs.com/package/mkdirp) to avoid filesystem errors
- Emits start, finish and error events for each file that is processed
- Optional promise-based interface

## Examples

#### Node-style callback interface

```javascript
var copy = require('recursive-copy');

copy('src', 'dest', function(error, results) {
	if (error) {
		console.error('Copy failed: ' + error);
	} else {
		console.info('Copied ' + results.length + ' files');
	}
});
```

#### Promise interface

```javascript
var copy = require('recursive-copy');

copy('src', 'dest')
	.then(function(results) {
		console.info('Copied ' + results.length + ' files');
	})
	.catch(function(error) {
		console.error('Copy failed: ' + error);
	});
```

#### Advanced options

```javascript
var copy = require('recursive-copy');

var path = require('path');
var through = require('through2');

var options = {
	overwrite: true,
	expand: true,
	dot: true,
	junk: true,
	filter: [
		'**/*',
		'!.htpasswd'
	],
	rename: function(filePath) {
		return filePath + '.orig';
	},
	transform: function(src, dest, stats) {
		if (path.extname(src) !== '.txt') { return null; }
		return through(function(chunk, enc, done)  {
			var output = chunk.toString().toUpperCase();
			done(null, output);
		});
	}
};

copy('src', 'dest', options)
	.on(copy.events.COPY_FILE_START, function(copyOperation) {
		console.info('Copying file ' + copyOperation.src + '...');
	})
	.on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
		console.info('Copied to ' + copyOperation.dest);
	})
	.on(copy.events.ERROR, function(error, copyOperation) {
		console.error('Unable to copy ' + copyOperation.dest);
	})
	.then(function(results) {
		console.info(results.length + ' file(s) copied');
	})
	.catch(function(error) {
		return console.error('Copy failed: ' + error);
	});
```


## Usage

### `copy(src, dest, [options], [callback])`

Recursively copy files and folders from `src` to `dest`

#### Arguments:

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `src` | `string` | Yes | N/A | Source file/folder path |
| `dest` | `string` | Yes | N/A | Destination file/folder path |
| `options.overwrite` | `boolean` | No | `false` | Whether to overwrite destination files |
| `options.expand` | `boolean` | No | `false` | Whether to expand symbolic links |
| `options.dot` | `boolean` | No | `false` | Whether to copy files beginning with a `.` |
| `options.junk` | `boolean` | No | `false` | Whether to copy OS junk files (e.g. `.DS_Store`, `Thumbs.db`) |
| `options.filter` | `function`, `RegExp`, `string`, `array` | No | `null` | Filter function / regular expression / glob that determines which files to copy (uses [maximatch](https://www.npmjs.com/package/maximatch)) |
| `options.rename` | `function` | No | `null` | Function that maps source paths to destination paths |
| `options.transform` | `function` | No | `null` | Function that returns a transform stream used to modify file contents |
| `callback` | `function` | No | `null` | Callback, invoked on success/failure |


#### Returns:

`Promise<Array>` Promise, fulfilled with array of copy results:

```json
[
	{
		"src": "/path/to/src",
		"dest": "/path/to/dest",
		"stats": <Stats>
	},
	{
		"src": "/path/to/src/file.txt",
		"dest": "/path/to/dest/file.txt",
		"stats": <Stats>
	},
	{
		"src": "/path/to/src/subfolder",
		"dest": "/path/to/dest/subfolder",
		"stats": <Stats>
	},
	{
		"src": "/path/to/src/subfolder/nested.txt",
		"dest": "/path/to/dest/subfolder/nested.txt",
		"stats": <Stats>
	}
]
```

## Events

The value returned by the `copy` function implements the `EventEmitter` interface, and emits the following events:

| Event | Handler signature |
| ----- | ----------------- |
| `copy.events.ERROR` | `function(error, ErrorInfo)` |
| `copy.events.COMPLETE` | `function(Array<CopyOperation>)` |
| `copy.events.CREATE_DIRECTORY_START` | `function(CopyOperation)` |
| `copy.events.CREATE_DIRECTORY_ERROR` | `function(error, CopyOperation)` |
| `copy.events.CREATE_DIRECTORY_COMPLETE` | `function(CopyOperation)` |
| `copy.events.CREATE_SYMLINK_START` | `function(CopyOperation)` |
| `copy.events.CREATE_SYMLINK_ERROR` | `function(error, CopyOperation)` |
| `copy.events.CREATE_SYMLINK_COMPLETE` | `function(CopyOperation)` |
| `copy.events.COPY_FILE_START` | `function(CopyOperation)` |
| `copy.events.COPY_FILE_ERROR` | `function(error, CopyOperation)` |
| `copy.events.COPY_FILE_COMPLETE` | `function(CopyOperation)` |

...where the types referred to in the handler signature are as follows:

### `ErrorInfo`

| Property | Type | Description |
| -------- | ---- | ----------- |
| `src` | `string` | Source path of the file/folder/symlink that failed to copy |
| `dest` | `string` | Destination path of the file/folder/symlink that failed to copy |

### `CopyOperation`

| Property | Type | Description |
| -------- | ---- | ----------- |
| `src` | `string` | Source path of the relevant file/folder/symlink |
| `dest` | `string` | Destination path of the relevant file/folder/symlink |
| `stats ` | `fs.Stats` | Stats for the relevant file/folder/symlink |
