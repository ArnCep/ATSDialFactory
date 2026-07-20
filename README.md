# ATSDialFactory

<img width="2559" height="1304" alt="Screenshot 2026-07-20 164446" src="https://github.com/user-attachments/assets/a71f90e1-4243-4998-8acf-33d7297d3527" />

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

## About

ATSDialFactory is designed to provide a modern, browser-based workflow for creating watch faces for IDO smartwatches using web technologies without complex installations of Python, C++, or other coding languages.

The project focuses on compatibility with Actions MCU-based IDO devices while providing a more accessible alternative to traditional watch face creation tools.
