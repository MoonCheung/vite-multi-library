/**
 * Img-Uploader 1.0.0
 * Image type inputer or uploader
 * https://github.com/MoonCheung/img-uploader#readme
 * Copyright 2023-2023 MoonCheung
 * Released under the MIT License
 * Released on: 2023年1月13日
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["img-uploader"] = {}));
})(this, (function (exports) { 'use strict';

	const str = 'hello Core index';

	exports.str = str;

}));
