![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Image Tool with source field

Original Image Block forked from the [editor-js/image](https://github.com/editor-js/image).

All configuration parameters match the original, except:

## Installation

### Install via NPM

### Other methods

#### Manual downloading and connecting

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Config Params

Image Tool supports these configuration parameters:

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| sourcePlaceholder | `string` | (default: `Source`) Placeholder for Source input |

## Output data

This Tool returns `data` with following format

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| source         | `string`  | image's source                  |
