# ATSDialFactory

<img width="2558" height="1306" alt="Screenshot 2026-07-25 125028" src="https://github.com/user-attachments/assets/d242d4f5-b335-43f2-9dd2-67ac6056b9fc" />

A browser-based watch face editor written in TypeScript for IDO smartwatches powered by Actions MCU platforms.

ATSDialFactory allows users to create, edit, preview, and export custom watch faces using the IDO watch face format.

## Features

* Browser-based watch face editing
* Interactive watch preview renderer
* IDO `.iwf` project support
* Custom image-based font rendering
* Clock hand editing with anchor and rotation support
* Widget-based watch face design
* `iwf.json` and `font.json` compatibility
* Watch face preview generation
* Exportable watch face packages

## Supported Devices

Currently supported:

### Smartwatches:
* IDW13
* IDW18
* IDW20

### Smartbands:
* IDB03

Additional Actions MCU-based IDO smartwatch models (e.g. IDSport03) may be supported in future releases.

## Sample Watch Faces
### 512w1
<img width="174" height="196" alt="preview" src="https://github.com/user-attachments/assets/092f98cb-07cb-4e5a-929a-1b273e640ef6" />

### 835w1
<img width="154" height="240" alt="preview" src="https://github.com/user-attachments/assets/cc4dbab8-dbc3-43ec-9fd1-1ee895fbf0dd" />

### 840w1
<img width="272" height="324" alt="preview" src="https://github.com/user-attachments/assets/1a5419fc-f2f1-434c-8977-780c3c4625f0" />

### More sample watch faces to be made...

## Choosing the right watch face editor
If you prefer more customization and no complex framework installations, read this image for more information.

<img width="1280" height="720" alt="Untitled - July 25, 2026 at 12 57 31" src="https://github.com/user-attachments/assets/d3c7b125-dd26-405b-9ba1-be73174fdedc" />

## Known Issues

The background corner matcher dialog is still being improved, so expect issues:

* Green background corners may differ in model resolution

## Packing Watch Faces
ATSDialFactory does not support compiling watch faces into a binary format (.iwf). To pack a watch face into an .iwf file, you must install these files/packages first:

* Python 3.11 or higher (With "Add to PATH" enabled)
* Pillow (pip install pillow)

Usage: `python iwf_packer.py INPUT_FOLDER OUTPUT_FILE`

<img width="1357" height="1204" alt="Untitled - July 20, 2026 at 17 30 03" src="https://github.com/user-attachments/assets/2b3b544f-239e-49ea-8bd2-b181912f8b56" />

## Important Notes
* Ring widgets, Progressbar widgets, and some custom widgets are not supported yet. They will be added once reverse-engineered further.
* IDO Smartwatches or Smartbands with Sifli MCUs are NOT compatible with this editor since they use an encrypted format `.watch`.

## About

ATSDialFactory is designed to provide a modern, browser-based workflow for creating watch faces for IDO smartwatches using web technologies without complex installations of Python, C++, or other coding languages.

The project focuses on compatibility with Actions MCU-based IDO devices while providing a more accessible alternative to traditional watch face creation tools.
