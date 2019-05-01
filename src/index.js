import './index.css';
import ToolboxIcon from './svg/toolbox.svg';
import Uploader from './uploader';

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
 * @class Attaches
 * @classdesc Attaches Tool for Editor.js 2.0
 *
 * @property {API} api - Editor.js API
 * @property {AttachesToolData} data
 * @property {Object} config
 */
export default class Attaches {
  /**
   *
   * @param data
   * @param config
   * @param api
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.nodes = {
      wrapper: null,
      button: null,
      size: null,
      extension: null
    };

    this._data = {};

    this.config = {
      endpoint: config.endpoint || '',
      field: config.field || 'file',
      types: config.types || '*',
      placeholder: config.placeholder || 'Загрузить'
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
      icon: ToolboxIcon,
      title: 'Attaches'
    };
  }

  /**
   * Tool's CSS classes
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,

      /**
       * Tool's classes
       */
      wrapper: 'cdx-attaches',
      wrapperWithFile: 'cdx-attaches--with-file',
      button: 'cdx-attaches__button',
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
      const title = toolsContent.querySelector(`.${this.CSS.button}`).textContent;

      Object.assign(this.data, this._data, { title });
    }

    return this.data;
  }

  /**
   * Renders Block content
   * @return {HTMLDivElement}
   */
  render() {
    this.nodes.wrapper = this.make('div', [this.CSS.baseClass, this.CSS.wrapper]);
    this.nodes.button = this.make('div', this.CSS.button);
    this.nodes.size = this.make('div', this.CSS.size);
    this.nodes.extension = this.make('div', this.CSS.extension);

    if (this.data.url) {
      this.showFileData();
    } else {
      this.nodes.button.textContent = this.config.placeholder;
      this.nodes.button.addEventListener('click', this.enableFileUpload);
    }

    this.nodes.wrapper.appendChild(this.nodes.button);
    this.nodes.wrapper.appendChild(this.nodes.extension);
    this.nodes.wrapper.appendChild(this.nodes.size);

    return this.nodes.wrapper;
  }

  /**
   * Allow to upload files on button click
   */
  enableFileUpload() {
    this.uploader.uploadSelectedFile({
      onPreview: () => {
        // TODO: add loader
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

      Object.assign(this.data, {
        url: file.url,
        name: file.name,
        extension: extension,
        size: Math.round(parseInt(file.size) / 1000), // size in KB
        title: fullFileName.join('.')
      });

      this.nodes.button.removeEventListener('click', this.enableFileUpload);
      this.showFileData();
    } else {
      this.uploadingFailed('File upload failed');
    }
  }

  /**
   * After file has loaded, add event-listeners and make field content-editable
   */
  prepareFileField() {
    this.nodes.button.setAttribute('contentEditable', true);

    this.nodes.button.addEventListener('keydown', (event) => {
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

    this.nodes.wrapper.classList.add(this.CSS.wrapperWithFile);
    this.nodes.button.textContent = this.data.title;
    this.nodes.size.textContent = this.data.size;
    this.nodes.extension.textContent = this.data.extension;
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
