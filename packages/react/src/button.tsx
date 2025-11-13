import { style, styleInject } from '@img-uploader/core'
import React, { FC, ReactNode } from 'react'

styleInject(style)

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'error'
  children?: ReactNode
  onClick: () => void
}

const CButton: FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button type='button' className={`Button Button-${type}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default CButton
