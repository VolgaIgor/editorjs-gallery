![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Gallery block for Editor.js

Loader based on [editor-js/image](https://github.com/editor-js/image).

### Preview
![Preview image](https://raw.githubusercontent.com/VolgaIgor/editorjs-gallery/master/assets/screenshot.png)

### Features
* Multiple downloads
* Sorting uploaded images
* Limit the number of images
* Two view selector (slider and fit)

## Installation

### Other methods

#### Manual downloading and connecting

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage
```javascript
var editor = EditorJS({
  // ...
  tools: {
    // ...
    gallery: gallery: {
      class: ImageGallery,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile',
        }
      },
    },
  }
  // ...
});
```

## Config Params

Gallery block supports these configuration parameters:

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| maxElementCount | `int` | (default: `undefined`) Maximum allowed number of images |
| buttonContent | `string` | (default: `Select an Image`) Label for upload button |
| captionPlaceholder | `string` | (default: `Gallery caption`) Placeholder for gallery caption input |
| uploader | `{{uploadByFile: function}}` | Optional custom uploading method. [See details](https://github.com/editor-js/image#providing-custom-uploading-methods). |
| [And others from the original ](https://github.com/editor-js/image#config-params) |

## Output data

This Tool returns `data` with following format

| Field          | Type       | Description                      |
| -------------- | ---------  | -------------------------------- |
| files          | `object[]` | Uploaded file datas. Any data got from backend uploader. Always contain the `url` property                  |
| source         | `string`   | image's source                   |
| style          | `string`   | (`fit` of `slider`) gallery view |
