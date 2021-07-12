import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const BLOCK_NAME = 'error-message'

interface Props {
  errorMessage: string | undefined,
}

const ErrorMessage = ({ errorMessage } : Props) => {

  return (
    <div className={BLOCK_NAME}>
      <FormattedMessage {...messages.error} />

      {errorMessage && (
        <div className={`${BLOCK_NAME}__description`}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default ErrorMessage