import ajax from '@codexteam/ajax';

/**
 * Module for file uploading.
 */
export default class Uploader {
  /**
   * @param config.config
   * @param {object} config
   * @param {Function} onUpload - callback for successful file upload
   * @param {Function} onError - callback for uploading errors
   * @param config.onUpload
   * @param config.onError
   */
  constructor({ config, onUpload, onError }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }

  /**
   * Handle clicks on the upload file button
   *
   * @fires ajax.transport()
   * @param {Function} onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview }) {
    /**
     * Custom uploading
     * or default uploading
     */
    let upload;

    // custom uploading
    if (this.config.uploader && typeof this.config.uploader.uploadByFile === 'function') {
      upload = ajax.selectFiles({ accept: this.config.types }).then((files) => {
        onPreview();
        const customUpload = this.config.uploader.uploadByFile(files[0]);

        if (!isPromise(customUpload)) {
          console.warn('Custom uploader method uploadByFile should return a Promise');
        }

        return customUpload;
      });

      // default uploading
    } else {
      upload = ajax.transport({
        url: this.config.endpoint,
        accept: this.config.types,
        beforeSend: () => onPreview(),
        fieldName: this.config.field,
        headers: this.config.additionalRequestHeaders || {}
      }).then((response) => response.body);
    }

    upload.then((response) => {
      this.onUpload(response);
    }).catch((errorResponse) => {
      const error = errorResponse.body;

      const message = (error && error.message) ? error.message : this.config.errorMessage;

      this.onError(message);
    });
  }
}
/**
 * Check if passed object is a Promise
 *
 * @param  {*}  object - object to check
 * @returns {boolean}
 */
function isPromise(object) {
  return object && typeof object.then === 'function';
}
