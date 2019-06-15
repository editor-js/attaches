import './index.css';
import Uploader from './uploader';
import Icon from './svg/toolbox.svg';
const LOADER_TIMEOUT = 500;

/**
 * @typedef {object} AttachesToolData
 * @description Attaches Tool's output data format
 * @property {AttachesFileData} file - object containing information about the file
 */

/**
 * @typedef {object} AttachesFileData
 * @description Attaches Tool's file format
 * @property {string} url - file's upload url
 * @property {string} [size] - file's size
 * @property {string} [extension] - file's extension
 * @property {string} [title] - file's name
 */

/**
 * @typedef {object} FileData
 * @description Attaches Tool's response from backend
 * @property {string} url - file's url
 * @property {string} name - file's name with extension
 * @property {string} extension - file's extension
 */

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on file upload
 * @property {number} success  - 1 for successful uploading, 0 for failure
 * @property {FileData} file - backend response with uploaded file data.
 */

/**
 * @typedef {object} AttachesToolConfig
 * @description Config supported by Tool
 * @property {string} endpoint - file upload url
 * @property {string} field - field name for uploaded file
 * @property {string} types - available mime-types
 * @property {string} placeholder
 * @property {string} errorMessage
 */

/**
 * @class AttachesTool
 * @classdesc AttachesTool for Editor.js 2.0
 *
 * @property {API} api - Editor.js API
 * @property {AttachesToolData} data
 * @property {AttachesToolConfig} config
 */
export default class AttachesTool {
  /**
   * @param {AttachesToolData} data
   * @param {Object} config
   * @param {API} api
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.nodes = {
      wrapper: null,
      button: null,
      title: null
    };

    this._data = {
      file: {}
    };

    this.config = {
      endpoint: config.endpoint || '',
      field: config.field || 'file',
      types: config.types || '*',
      buttonText: config.buttonText || 'Select file',
      errorMessage: config.errorMessage || 'File upload failed'
    };

    this.data = data;

    /**
     * Module for files uploading
     */
    this.uploader = new Uploader({
      config: this.config,
      onUpload: (response) => this.onUpload(response),
      onError: (error) => this.uploadingFailed(error)
    });

    this.enableFileUpload = this.enableFileUpload.bind(this);
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */
  static get toolbox() {
    return {
      icon: Icon,
      title: 'Attaches'
    };
  }

  /**
   * Tool's CSS classes
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      apiButton: this.api.styles.button,
      loader: this.api.styles.loader,
      /**
       * Tool's classes
       */
      wrapper: 'cdx-attaches',
      wrapperWithFile: 'cdx-attaches--with-file',
      wrapperLoading: 'cdx-attaches--loading',
      button: 'cdx-attaches__button',
      title: 'cdx-attaches__title',
      size: 'cdx-attaches__size',
      extension: 'cdx-attaches__extension'
    };
  }

  /**
   * Return Block data
   * @return {AttachesToolData}
   */
  save(toolsContent) {
    /**
     * If file was uploaded
     */
    if (this.data.file.url) {
      const title = toolsContent.querySelector(`.${this.CSS.title}`).textContent;

      Object.assign(this.data.file, this._data.file, { title });
    }

    return this.data;
  }

  /**
   * Renders Block content
   * @return {HTMLDivElement}
   */
  render() {
    const holder = this.make('div', this.CSS.baseClass);

    this.nodes.wrapper = this.make('div', this.CSS.wrapper);

    if (this.data.file.url) {
      this.showFileData();
    } else {
      this.prepareUploadButton();
    }

    holder.appendChild(this.nodes.wrapper);

    return holder;
  }

  /**
   * Prepares button for file uploading
   */
  prepareUploadButton() {
    this.nodes.button = this.make('div', [this.CSS.apiButton, this.CSS.button]);
    this.nodes.button.innerHTML = `${Icon} ${this.config.buttonText}`;
    this.nodes.button.addEventListener('click', this.enableFileUpload);
    this.nodes.wrapper.appendChild(this.nodes.button);
  }

  /**
   * Fires after clicks on the Toolbox AttachesTool Icon
   * Initiates click on the Select File button
   * @public
   */
  appendCallback() {
    this.nodes.button.click();
  }

  /**
   * Allow to upload files on button click
   */
  enableFileUpload() {
    this.uploader.uploadSelectedFile({
      onPreview: () => {
        this.nodes.wrapper.classList.add(this.CSS.wrapperLoading, this.CSS.loader);
      }
    });
  }

  /**
   * File uploading callback
   * @param {UploadResponseFormat} response
   */
  onUpload(response) {
    const body = response.body;

    if (body.success && body.file) {
      const { url, name, size } = body.file;

      /**
       * File name may be composite, for example, webpack.config.js
       */
      const [extension, ...fullFileName] = name.split('.').reverse();

      this.data.file = {
        url,
        extension,
        size: Math.round(parseInt(size) / 1000), // size in KB
        title: fullFileName.join('.')
      };

      this.nodes.button.remove();
      this.showFileData();
      this.moveCaretToEnd(this.nodes.title);
      this.removeLoader();
    } else {
      this.uploadingFailed(this.config.errorMessage);
    }
  }

  /**
   * Removes tool's loader
   */
  removeLoader() {
    setTimeout(() => this.nodes.wrapper.classList.remove(this.CSS.wrapperLoading, this.CSS.loader), LOADER_TIMEOUT);
  }

  /**
   * After file has loaded, prepare field with file name
   */
  prepareTitleField() {
    this.nodes.title = this.make('div', this.CSS.title, {
      contentEditable: true
    });

    this.nodes.title.addEventListener('keydown', (event) => {
      const A = 65;
      const cmdPressed = event.ctrlKey || event.metaKey;

      if (event.keyCode === A && cmdPressed) {
        event.stopPropagation();
      }
    });

    this.nodes.wrapper.appendChild(this.nodes.title);
  }

  /**
   * If upload is successful, show info about the file
   */
  showFileData() {
    this.prepareTitleField();

    const { title, extension, size } = this.data.file;

    if (title) {
      this.nodes.wrapper.classList.add(this.CSS.wrapperWithFile);
      this.nodes.title.textContent = this.data.file.title;
    }

    if (extension) {
      const fileExtension = this.make('div', this.CSS.extension);

      fileExtension.textContent = extension;
      this.nodes.wrapper.appendChild(fileExtension);
    }

    if (size) {
      const fileSize = this.make('div', this.CSS.size);

      fileSize.textContent = size;
      this.nodes.wrapper.appendChild(fileSize);
    }
  }

  /**
   * If file uploading failed, remove loader and show notification
   * @param {string} errorMessage -  error message
   */
  uploadingFailed(errorMessage) {
    this.api.notifier.show({
      message: errorMessage,
      style: 'error'
    });

    this.removeLoader();
  }

  /**
   * Return Attaches Tool's data
   * @return {AttachesToolData}
   */
  get data() {
    return this._data;
  }

  /**
   * Stores all Tool's data
   * @param {AttachesToolData} data
   */
  set data({ file }) {
    this._data.file = Object.assign({}, {
      url: (file && file.url) || this._data.file.url,
      title: (file && file.title) || this._data.file.title,
      extension: (file && file.extension) || this._data.file.extension,
      size: (file && file.size) || this._data.file.size
    });
  }

  /**
   * Moves caret to the end of contentEditable element
   * @param {HTMLElement} element - contentEditable element
   */
  moveCaretToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * Helper method for elements creation
   * @param tagName
   * @param classNames
   * @param attributes
   * @return {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
