![](https://badgen.net/badge/Editor.js/v2.0/blue)
# Attaches Tool
Attaches Tool for the [Editor.js](https://codex.so/editor).

This tool allows you to attach files to your articles.

![Example](https://capella.pics/9480f2c1-fd05-45b5-9d0f-20e40a9a2700.jpg)

Get the package

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

`https://cdn.jsdelivr.net/npm/@editorjs/attaches@1.0.0`

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

Image Tool supports these configuration parameters:

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| endpoint | `string` | **Required:** endpoint for file uploading. |
| field | `string` | (default: `file`) Name of uploaded file field in POST request |
| types | `string` | (default: `*`) Mime-types of files that can be [accepted with file selection](https://github.com/codex-team/ajax#accept-string).|
| buttonText | `string` | (default: `Select file`) Placeholder for file upload button |
| errorMessage | `string` | (default: `File upload failed`) Message to show if file upload failed |


## Output data

This Tool returns `data` with following format

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| file           | `object`  | Uploaded file data. Any data got from backend uploader. Always contain the `url` property |

Object `file` consists of the following fields

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| url        | `string`  | **Required:**  full public path of uploaded file|
| size        | `number`  | file's size |
| extension     | `string` | file's extension            |
| title | `string` | file's name          |

```json
{
    "type" : "attaches",
    "data" : {
        "file": {
            "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
            "size": 91,
            "title": "Hero",
            "extension": "jpg"
        }
    }
}
```

## Backend response format <a name="server-format"></a>

Response of your uploader **should** cover following format:

```json5
{
    "success" : 1,
    "file": {
        "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        // ... and any additional fields you want
    }
}
```

**success** - uploading status. 1 for successful, 0 for failed

**file** - uploaded file data. **Must** contain an `url` field with full public path to the uploaded file.
Also, can contain any additional fields you want to store. For example, file name, size, extension etc.
All additional fields will be saved at the `file` object of output data.
