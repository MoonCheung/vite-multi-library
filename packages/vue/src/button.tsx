import { defineComponent } from 'vue';
import './button.css';
export default defineComponent({
  name: 'CButton',
  inheritAttrs: false,
  props: {
    onClick: Function
  },
  setup(props, { slots, attrs }) {
    return () => {
      const eventProps = { ...props, ...attrs };
      return (
        <button {...(eventProps as any)} class='button'>
          {slots.default?.()}
        </button>
      );
    };
  }
});
