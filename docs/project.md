# QR-KY Project Overview

This project is a static site that presents users with various options for generating QR codes.

## Building

* Ensure the correct version of node is selected (`nvm use`)
* Check types: `yarn typecheck`
* Build: `yarn build`

## Goals

* Users do not need to create accounts in order to generate QR codes
* All processing occurs client side, eliminating the need for server side processing

## Libraries

* React Router: [docs](https://reactrouter.com/home)
* QR Code generation: [`qrcode.react`](https://github.com/zpao/qrcode.react)
* UI/Components: [`shadcn`](https://ui.shadcn.com/)

## Routes

These routes should all be static (pre-render render strategy in react router).

### Home

The Home route is the main/root route in the app that will present the user with a form that will provide the user with options for generating a QR code.

**Main Features**

* QR code type: url, wifi, raw
* Colors: foreground, background
* Preview: a frame to render based on the config
* Download: png, svg

#### QR Code Type

* URL: a single text box that simply validates a well-formed URL. If the url is not well-formed, the QR code should still render with the given string data, but a warning should be displayed to the user.
* Wifi: a series of text boxes that accept information from the user for their wifi configuration. See `docs/WPA3 Specification v3.2.txt` for the official specification.
* Raw: a single text box that will accept any string as the embedded QR data.

#### Colors

* Foreground: color picker to pick a foreground color. Default is black.
* Background: color picker to pick a background color. Default is white. Also include a text box to set the background to transparent.

#### Preview

The QR preview frame should render a QR code. A "generate" button will trigger QR generation and update whatever QR code was previously rendered.

#### Download

Under the preview there should be buttons to download the QR code. The user should be able to select between png and svg. The output size should be 1000x1000 px.

## ShadCN

Add components use `yarn shadcn add <component>` (e.g. `yarn shadcn add button`).
