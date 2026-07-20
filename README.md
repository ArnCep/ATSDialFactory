# ATSDialFactory

<img width="2559" height="1304" alt="Screenshot 2026-07-20 164446" src="https://github.com/user-attachments/assets/451f29f8-eab9-46dc-81eb-da329572ae5e" />

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

* IDW13
* IDW20

Additional Actions MCU-based IDO smartwatch models (e.g. IDSport03) may be supported in future releases.

## Known Issues

The `preview.png` image generation is still being improved, so expect issues:

* Preview image may not appear in the downloaded .zip file

## Packing Watch Faces
ATSDialFactory does not support compiling watch faces into a binary format (.iwf). To pack a watch face into an .iwf file, you must install these files/packages first:

* Python 3.11 or higher (With "Add to PATH" enabled)
* Pillow (pip install pillow)

Usage: `python iwf_packer.py INPUT_FOLDER OUTPUT_FILE`

<img width="1357" height="1204" alt="Untitled - July 20, 2026 at 17 30 03" src="https://github.com/user-attachments/assets/2b3b544f-239e-49ea-8bd2-b181912f8b56" />

## About

ATSDialFactory is designed to provide a modern, browser-based workflow for creating watch faces for IDO smartwatches using web technologies without complex installations of Python, C++, or other coding languages.

The project focuses on compatibility with Actions MCU-based IDO devices while providing a more accessible alternative to traditional watch face creation tools.
