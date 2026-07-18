# ATSDialFactory

<img width="2559" height="1304" alt="Screenshot 2026-07-17 222315" src="https://github.com/user-attachments/assets/bb0739d3-4919-4820-b4fb-9a6c9546cbb8" />

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

* IDW20

Additional Actions MCU-based IDO smartwatch models (Such as the IDSport03) may be supported in future releases.

## Known Issues

The `preview.png` image generation is still being improved, so expect issues:

* Exported preview image may not perfectly match the editor preview, including possible differences in scaling, alignment, sharpness, or rounded display masking.

## About

ATSDialFactory is designed to provide a modern, browser-based workflow for creating watch faces for IDO smartwatches using web technologies without complex installations of Python, C++, or other complex coding language installs.

The project focuses on compatibility with Actions MCU-based IDO devices while providing a more accessible alternative to traditional watch face creation tools.
