import ajax from '@codexteam/ajax';

/**
 * Module for file uploading. Handle 3 scenarios:
 *  1. Select file from device and upload
 *  2. Upload by pasting URL
 *  3. Upload by pasting file from Clipboard or by Drag'n'Drop
 */
export default class Uploader {
  /**
   * @param {object} params - uploader module params
   * @param {ImageConfig} params.config - image tool config
   */
  constructor({ config }) {
    this.config = config;
  }

  /**
   * Handle clicks on the upload file button
   */
  uploadSelectedFiles(maxElementCount, { onPreview, onUpload, onError }) {
    ajax.selectFiles({
      accept: this.config.types,
      multiple: true
    }).then((files) => {
      let loadedFiles = 0;
      for (var i = 0; i < files.length; i++) {
        if (maxElementCount !== null && loadedFiles == maxElementCount) {
          break;
        } else {
          loadedFiles++;
        }

        let file = files[i];
        let previewElem = onPreview(file);

        let uploader;

        if (this.config.uploader && typeof this.config.uploader.uploadByFile === 'function') {
          const customUpload = this.config.uploader.uploadByFile(file);

          if (!isPromise(customUpload)) {
            console.warn('Custom uploader method uploadByFile should return a Promise');
          }

          uploader = customUpload;
        } else {
          uploader = this.uploadByFile(file);
        }

        uploader.then((response) => {
          onUpload(response, previewElem);
        }).catch((error) => {
          onError(error, previewElem);
        });
      }
    });
  }

  /**
   * Default file uploader
   * Fires ajax.post()
   *
   * @param {File} file - file pasted by drag-n-drop
   */
  uploadByFile(file) {
    const formData = new FormData();

    formData.append(this.config.field, file);

    if (this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length) {
      Object.entries(this.config.additionalRequestData).forEach(([name, value]) => {
        formData.append(name, value);
      });
    }

    return ajax.post({
      url: this.config.endpoints.byFile,
      data: formData,
      type: ajax.contentType.JSON,
      headers: this.config.additionalRequestHeaders,
    }).then(response => response.body);
  }
}

/**
 * Check if passed object is a Promise
 *
 * @param  {*}  object - object to check
 * @returns {boolean}
 */
function isPromise(object) {
  return object && typeof object.then === "function";
}
