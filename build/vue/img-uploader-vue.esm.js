/**
 * Img-Uploader Vue 1.0.0
 * Image type inputer or uploader
 * https://github.com/MoonCheung/img-uploader#readme
 * Copyright 2023-2023 MoonCheung
 * Released under the MIT License
 * Released on: 2023年1月13日
 */

import { createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
import { defineComponent } from 'vue';
var ImgUploader = defineComponent({
  name: 'ImgUploader',
  setup: function setup() {
    return _createVNode("div", null, [_createTextVNode("hello Vue")]);
  }
});
export default ImgUploader;
export { ImgUploader };
