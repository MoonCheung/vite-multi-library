import { DefineComponent } from 'vue';

declare const ImgUploader: DefineComponent<{
  component: {
    type: StringConstructor;
    default: string;
  };
}>;

export default ImgUploader;
export { ImgUploader };
