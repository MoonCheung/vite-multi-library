import { style, styleInject } from '@img-uploader/core'
import { defineComponent } from 'vue'

styleInject(style)
export default defineComponent({
  name: 'CButton',
  inheritAttrs: false,
  props: {
    onClick: Function
  },
  setup(props, { slots, attrs }) {
    return () => {
      const eventProps = { ...props, ...attrs }
      return (
        <button {...(eventProps as any)} class='button'>
          {slots.default?.()}
        </button>
      )
    }
  }
})
