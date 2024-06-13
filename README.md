![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Gallery block for Editor.js

Loader based on [editor-js/image](https://github.com/editor-js/image).

### Preview
![Preview image](https://raw.githubusercontent.com/VolgaIgor/editorjs-gallery/master/assets/screenshot.png)

### Features
* Multiple downloads
* Sorting uploaded images (providing by [SortableJS](https://github.com/SortableJS/Sortable))
* Limit the number of images
* Two view selector (slider and fit)

## Installation
### Install via NPM
Get the package

```shell
$ npm i @kiberpro/editorjs-gallery
```

Include module at your application

```javascript
import ImageGallery from '@kiberpro/editorjs-gallery';
```

### Load from CDN

You can load a specific version of the package from jsDelivr CDN.

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/kiberpro/editorjs-gallery"></script>
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/gallery.umd.js` file to your page.

### Enable sorting
To enable sorting, include the SortableJS library and send it to the configuration:
```shell
$ npm i sortablejs
```
```javascript
import Sortable from 'sortablejs';
```

## Usage
```javascript
var editor = EditorJS({
  // ...
  tools: {
    // ...
    gallery: {
      class: ImageGallery,
      config: {
        sortableJs: Sortable,
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
| sortableJs | `object` | SortableJS library |
| maxElementCount | `int` | (default: `undefined`) Maximum allowed number of images |
| buttonContent | `string` | (default: `Select an Image`) Label for upload button |
| uploader | `{{uploadByFile: function}}` | Optional custom uploading method. [See details](https://github.com/editor-js/image#providing-custom-uploading-methods). |
| actions | `[{name: string, icon: string, title: string}]` | Array with custom switches |
| [And others from the original ](https://github.com/editor-js/image#config-params) |

Also you can add a localized string:
```javascript
new Editorjs({
  // ...
  tools: {
    gallery: ImageGallery
  },
  i18n: {
    tools: {
      gallery: {
        'Select an Image': 'Выберите изображение',
        'Delete': 'Удалить',
        'Gallery caption': 'Подпись'
      }
    }
  },
})
```

## Output data

This Tool returns `data` with following format

| Field          | Type       | Description                      |
| -------------- | ---------  | -------------------------------- |
| files          | `object[]` | Uploaded file datas. Any data got from backend uploader. Always contain the `url` property                  |
| source         | `string`   | image's source                   |
| style          | `string`   | (`fit` of `slider`) gallery view |
