/**
 * Registers the config.downloadButton.onClick function to the click event of the download button
 * if it is defined.
 *
 * @param {MouseEvent} event - The click event.
 * @param {Object} config - The configuration object.
 * @param {AttachesToolData} data - The data object.
 */
export function onClickDownloadButton(event, config, data) {
  if (config && config.downloadButton && config.downloadButton.onClick && typeof config.downloadButton.onClick === 'function') {
    config.downloadButton.onClick(event, data);
  }
}