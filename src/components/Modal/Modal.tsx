import React, { forwardRef } from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const BLOCK_NAME = 'modal'

interface Props {
  children: React.ReactNode,
  header: React.ReactNode,
  onClose(): void,
}

type Ref = HTMLDivElement

const Modal = forwardRef<Ref, Props>(({ children, header, onClose }, ref) => {

  return (
    <div className={BLOCK_NAME} ref={ref}>
      <div className={`${BLOCK_NAME}__header`}>
        {header}
        <button
          onClick={onClose}
          className={`${BLOCK_NAME}__close`}
          aria-label={'Close modal'}
        >
          <FormattedMessage {...messages.close} />
        </button>
      </div>
      {children}
    </div>
  )
})

export default Modal