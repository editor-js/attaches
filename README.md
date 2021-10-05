![](https://badgen.net/badge/Editor.js/v2.0/blue)
# Attaches Tool
Attaches Tool for the [Editor.js](https://codex.so/editor).

This tool allows you to attach files to your articles.

![Example](https://capella.pics/7b63cffe-9214-40f4-9009-0637970a4630.jpg)

## Get the package
You can get the package using any of these ways.

### Install via npm

```shell
npm i --save-dev @editorjs/attaches
```

Include module at your application

```javascript
const AttachesTool = require('@editorjs/attaches');
```


### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/attaches).

`https://cdn.jsdelivr.net/npm/@editorjs/attaches@latest`

Then require this script on page with Editor.js through the `<script src=""></script>` tag.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    attaches: {
      class: AttachesTool,
      config: {
        endpoint: 'http://localhost:8008/uploadFile'
      }
    }
  }

  ...
});
```

## Config Params

Attaches Tool supports these configuration parameters:

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| endpoint | `string` | Optional endpoint for file uploading or use uploader |
| uploader | `{uploadByFile: function}` |Optional custom uploading method or use endpoint|
| field | `string` | (default: `file`) Name of uploaded file field in POST request |
| types | `string` | (default: `*`) Mime-types of files that can be [accepted with file selection](https://github.com/codex-team/ajax#accept-string).|
| buttonText | `string` | (default: `Select file`) Placeholder for file upload button |
| errorMessage | `string` | (default: `File upload failed`) Message to show if file upload failed |
| additionalRequestHeaders | `object` | (default: `{}`) Object with any custom headers which will be added to request. Example: `{"X-CSRF-TOKEN": "W5fe2...hR8d1"}` |


## Output data

This Tool returns `data` with following format

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| file           | `object`  | Uploaded file data. Data received from backend uploader. See description below. |
| title | `string` | File's title. Initially set as uploaded file name. Can be modified by user.          |

### file object <a name="file-object"></a>
Object `file` consists of the following fields. All of them are optional, `size` and `extension` are supported by design.

| Field          | Type      | Description                       |
| -------------- | --------- | ----------------------------------|
| url            |`string`   | Full public path of uploaded file |
| size           |`number`   | File's size (expected in bytes, according to Tool's design)                      |
| name           |`string`   | File's name                       |
| extension      |`string`   | File's extension                  |

```json
{
    "type" : "attaches",
    "data" : {
        "file": {
            "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
            "size": 91,
            "name": "hero.jpg",
            "extension": "jpg"
        },
        "title": "Hero"
    }
}
```

## Backend response format

Response of your uploader **should** cover following format:

```json5
{
    "success" : 1,
    "file": {
        // any data you want 
        // for example: url, name, size, title
    }
}
```

**success** - uploading status. 1 for successful, 0 for failed

**file** - uploaded file data.
Can contain data you want to store. Fields `url`, `name`, `size`, and `extension` if present will be written to [file object](#file-object). Fields size and extension are supported by design.

## Providing custom uploading methods

As mentioned at the Config Params section, you have an ability to provide own custom uploading method.
It is a quite simple: implement `uploadByFile` method and pass them via `uploader` config param.
The method return a Promise that resolves with response in a format that described at the [backend response format](#backend-response-format) section.


| Method         | Arguments | Return value | Description |
| -------------- | --------- | -------------| ------------|
| uploadByFile   | `File`    | `{Promise.<{success, file: {url}}>}` | Upload file to the server and return an uploaded file data |

Example:

```js
import AttachesTool from '@editorjs/attaches';

var editor = EditorJS({
  ...

  tools: {
    ...
    attaches: {
      class: AttachesTool,
      config: {
        /**
         * Custom uploader
         */
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file){
            // your own uploading logic here
            return MyAjax.upload(file).then((response) => {
              return {
                success: 1,
                file: {
                  url: response.fileurl,
                  // any data you want 
                  // for example: name, size, title
                }
              };
            });
          },
        }
      }
    }
  }
  ...
});
```
