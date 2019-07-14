import './index.css';
import Uploader from './uploader';
import Icon from './svg/toolbox.svg';
import FileIcon from './svg/standard.svg';
import CustomFileIcon from './svg/custom.svg';
import DownloadIcon from './svg/arrow-download.svg';
const LOADER_TIMEOUT = 500;

/**
 * @typedef {object} AttachesToolData
 * @description Attaches Tool's output data format
 * @property {AttachesFileData} file - object containing information about the file
 * @property {string} title - file's title
 */

/**
 * @typedef {object} AttachesFileData
 * @description Attaches Tool's file format
 * @property {string} [url] - file's upload url
 * @property {string} [size] - file's size
 * @property {string} [extension] - file's extension
 * @property {string} [name] - file's name
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
      file: {},
      title: ''
    };

    this.config = {
      endpoint: config.endpoint || '',
      field: config.field || 'file',
      types: config.types || '*',
      buttonText: config.buttonText || 'Select file to upload',
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
      downloadButton: 'cdx-attaches__download-button',
      fileInfo: 'cdx-attaches__file-info',
      fileIcon: 'cdx-attaches__file-icon'
    };
  }

  /**
   * Return Block data
   * @param {HTMLElement} toolsContent
   * @return {AttachesToolData}
   */
  save(toolsContent) {
    /**
     * If file was uploaded
     */
    if (this.pluginHasData()) {
      const title = toolsContent.querySelector(`.${this.CSS.title}`).textContent;

      Object.assign(this.data, { title });
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

    if (this.pluginHasData()) {
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
   * Checks if any of Tool's fields have data
   * @return {boolean}
   */
  pluginHasData() {
    return this.data.title !== '' || Object.values(this.data.file).some(item => item !== undefined);
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

      this.data = {
        file: {
          url,
          extension: name.split('.').pop(),
          name,
          size: (size / 1000).toFixed(1) // size in KB
        },
        title: name
      };

      this.nodes.button.remove();
      this.showFileData();
      this.moveCaretToEnd(this.nodes.title);
      this.nodes.title.focus();
      this.removeLoader();
    } else {
      this.uploadingFailed(this.config.errorMessage);
    }
  }

  /**
   * Handles uploaded file's extension and appends corresponding icon
   */
  appendFileIcon() {
    const extension = this.data.file.extension || '';
    let extensionColor;
    let knownExtension = true;

    switch (extension.toLowerCase()) {
      case 'doc':
      case 'docx':
      case 'odt':
      {
        extensionColor = '#3e74da';
        break;
      }
      case 'pdf':
      {
        extensionColor = '#d47373';
        break;
      }
      case 'rtf':
      {
        extensionColor = '#656ecd';
        break;
      }
      case 'tex':
      case 'txt':
      {
        extensionColor = '#5a5a5b';
        break;
      }
      case 'pptx':
      {
        extensionColor = '#e07066';
        break;
      }
      case 'mp3':
      {
        extensionColor = '#eab456';
        break;
      }
      case 'xls':
      {
        extensionColor = '#3f9e64';
        break;
      }
      case 'html':
      case 'htm':
      {
        extensionColor = '#2988f0';
        break;
      }
      case 'png':
      {
        extensionColor = '#f676a6';
        break;
      }
      case 'jpg':
      case 'jpeg':
      {
        extensionColor = '#f67676';
        break;
      }
      case 'gif':
      {
        extensionColor = '#f6af76';
        break;
      }
      case 'zip':
      case 'rar':
      {
        extensionColor = '#4f566f';
        break;
      }
      case 'exe':
      {
        extensionColor = '#e26f6f';
        break;
      }
      case 'svg':
      {
        extensionColor = '#bf5252';
        break;
      }
      case 'key':
      {
        extensionColor = '#e07066';
        break;
      }
      default: {
        knownExtension = false;
      }
    }

    const fileIcon = this.make('div', this.CSS.fileIcon, {
      innerHTML: knownExtension ? CustomFileIcon : FileIcon
    });

    if (knownExtension) {
      fileIcon.style.color = extensionColor;
      fileIcon.querySelector('svg').style.fill = extensionColor;
      fileIcon.setAttribute('data-extension', extension);
    }

    this.nodes.wrapper.appendChild(fileIcon);
  }

  /**
   * Removes tool's loader
   */
  removeLoader() {
    setTimeout(() => this.nodes.wrapper.classList.remove(this.CSS.wrapperLoading, this.CSS.loader), LOADER_TIMEOUT);
  }

  /**
   * If upload is successful, show info about the file
   */
  showFileData() {
    this.nodes.wrapper.classList.add(this.CSS.wrapperWithFile);

    const { file: { size, url }, title } = this.data;

    this.appendFileIcon();

    const fileInfo = this.make('div', this.CSS.fileInfo);

    if (title) {
      this.nodes.title = this.make('div', this.CSS.title, {
        contentEditable: true
      });

      this.nodes.title.textContent = title;
      fileInfo.appendChild(this.nodes.title);
    }

    if (size) {
      const fileSize = this.make('div', this.CSS.size);

      fileSize.textContent = size;
      fileInfo.appendChild(fileSize);
    }

    this.nodes.wrapper.appendChild(fileInfo);

    const downloadIcon = this.make('a', this.CSS.downloadButton, {
      innerHTML: DownloadIcon,
      href: url,
      target: '_blank',
      rel: 'nofollow noindex noreferrer'
    });

    this.nodes.wrapper.appendChild(downloadIcon);
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
  set data({ file, title }) {
    this._data = Object.assign({}, {
      file: {
        url: (file && file.url) || this._data.file.url,
        name: (file && file.name) || this._data.file.name,
        extension: (file && file.extension) || this._data.file.extension,
        size: (file && file.size) || this._data.file.size
      },
      title: title || this._data.title
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
