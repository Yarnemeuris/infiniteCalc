# infiniteCalc

InfiniteCalc is a web-based calculator that supports (almost) infinitely big numbers. It does this by using strings instead of floats or integers. For division there is a limit so that it eventually stops, but you can change this limit.

## Features

Currently it supports addition, subtraction, multiplication and division. All with positive and negative numbers of any size (some operations, especially division, can take pretty long). In the future I might add roots and exponent

## Installation

You can use the demo via this link.
Or host it yourself with any static file server or the provided server. To use the provided server, run:
```shell
$ npm install
$ node server.js
```