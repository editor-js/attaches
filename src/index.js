import './index.css';
import Uploader from './uploader';
import Icon from './svg/toolbox.svg';
const LOADER_TIMEOUT = 500;

/**
 * @typedef {object} AttachesToolData
 * @description Attaches Tool's input and output data format
 * @property {string} url
 * @property {string} name
 * @property {string} size
 * @property {string} extension
 * @property {string} title
 */

/**
 * @class AttachesTool
 * @classdesc AttachesTool for Editor.js 2.0
 *
 * @property {API} api - Editor.js API
 * @property {AttachesToolData} data
 * @property {Object} config
 */
export default class AttachesTool {
  /**
   * @param data
   * @param config
   * @param api
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.nodes = {
      holder: null,
      title: null
    };

    this._data = {};

    this.config = {
      endpoint: config.endpoint || '',
      field: config.field || 'file',
      types: config.types || '*',
      placeholder: config.placeholder || 'Select file',
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
      button: this.api.styles.button,
      loader: this.api.styles.loader,
      /**
       * Tool's classes
       */
      holder: 'cdx-attaches',
      holderWithFile: 'cdx-attaches--with-file',
      holderLoading: 'cdx-attaches--loading',
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
    if (this.data.url) {
      const title = toolsContent.querySelector(`.${this.CSS.title}`).textContent;

      Object.assign(this.data, this._data, { title });
    }

    return this.data;
  }

  /**
   * Renders Block content
   * @return {HTMLDivElement}
   */
  render() {
    const wrapper = this.make('div', this.CSS.baseClass);

    this.nodes.holder = this.make('div', [this.CSS.holder, this.CSS.button]);
    this.nodes.title = this.make('div', this.CSS.title);

    this.nodes.holder.appendChild(this.nodes.title);

    if (this.data.url) {
      this.showFileData();
    } else {
      this.nodes.title.innerHTML = `${Icon} ${this.config.placeholder}`;
      this.nodes.holder.addEventListener('click', this.enableFileUpload);
    }

    wrapper.appendChild(this.nodes.holder);

    return wrapper;
  }

  /**
   * Allow to upload files on button click
   */
  enableFileUpload() {
    this.uploader.uploadSelectedFile({
      onPreview: () => {
        this.nodes.holder.classList.add(this.CSS.holderLoading, this.CSS.loader);
      }
    });
  }

  /**
   * File uploading callback
   * @param {UploadResponseFormat} response
   */
  onUpload(response) {
    const { body: { success, file } } = response;

    if (success && file && file.url) {
      /**
       * File name may be composite, for example, webpack.config.js
       */
      const [extension, ...fullFileName] = file.name.split('.').reverse();

      this.data = {
        url: file.url,
        name: file.name,
        extension: extension,
        size: Math.round(parseInt(file.size) / 1000), // size in KB
        title: fullFileName.join('.')
      };

      this.nodes.holder.removeEventListener('click', this.enableFileUpload);
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
    setTimeout(() => this.nodes.holder.classList.remove(this.CSS.holderLoading, this.CSS.loader), LOADER_TIMEOUT);
  }

  /**
   * After file has loaded, add event-listeners and make field content-editable
   */
  prepareFileField() {
    this.nodes.title.setAttribute('contentEditable', true);

    this.nodes.holder.addEventListener('keydown', (event) => {
      const A = 65;
      const cmdPressed = event.ctrlKey || event.metaKey;

      if (event.keyCode === A && cmdPressed) {
        event.stopPropagation();
      }
    });
  }

  /**
   * If upload is successful, show info about the file
   */
  showFileData() {
    this.prepareFileField();

    const size = this.make('div', this.CSS.size);
    const extension = this.make('div', this.CSS.extension);

    size.textContent = this.data.size;
    extension.textContent = this.data.extension;

    this.nodes.holder.classList.add(this.CSS.holderWithFile);
    this.nodes.title.textContent = this.data.title;
    this.nodes.holder.appendChild(extension);
    this.nodes.holder.appendChild(size);
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
   * Return Attaches data
   * @return {AttachesToolData}
   */
  get data() {
    return this._data;
  }

  /**
   * Stores all Tool's data
   * @param {AttachesToolData} data
   */
  set data({ url, title, name, extension, size }) {
    this._data = Object.assign({}, {
      url: url || this._data.url,
      title: title || this._data.title,
      name: name || this._data.name,
      extension: extension || this._data.extension,
      size: size || this._data.size
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
