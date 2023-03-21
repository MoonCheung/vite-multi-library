import type { Plugin, App } from 'vue';
import Component from './button';

export const CButton = Component;

export const install: Plugin = function (app: App) {
  app.component(Component.name, Component);
  return app;
};

export default {
  CButton: Component,
  install
};
