# ATSDialFactory

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

## Expect Issues during Beta Release

* The exported `preview.png` image generation is still being improved.
* In some cases, the exported preview image may not perfectly match the editor preview, including possible differences in scaling, alignment, sharpness, or rounded display masking.
* Watch face editing and export functionality are the primary focus during development. Preview rendering improvements will continue in future updates.

## About

ATSDialFactory is designed to provide a modern, browser-based workflow for creating watch faces for IDO smartwatches using web technologies.

The project focuses on compatibility with Actions MCU-based IDO devices while providing a more accessible alternative to traditional watch face creation tools.
