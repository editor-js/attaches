import ajax from '@codexteam/ajax';
/**
 * Module for file uploading with custom upload handler
 */
export default class CustomUploader {
  /**
   * @param {Object} config
   * @param {function} onUpload - callback for successful file upload
   * @param {function} onError - callback for uploading errors
   */
  constructor({ config, onUpload, onError }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
    this.uploadByFile = config.uploader.uploadByFile;
  }

  /**
   * Handle clicks on the upload file button
   * @param {function} onPreview - callback fired when preview is ready
   */
  async uploadSelectedFile({ onPreview }) {
    const files = await ajax.selectFiles({
      accept: this.config.accept,
      multiple: false });

    onPreview();
    if (!files.length) {
      this.onError('No files selected');
      return;
    }
    this.uploadByFile(files[0])
      .then((response) => this.onUpload({ body: response }))
      .catch((response) => this.onUpload({ body: response }));
  }
}