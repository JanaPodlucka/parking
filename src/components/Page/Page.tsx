import React from 'react'

import LanguageSwitcher from '../LanguageSwitcher'

const BLOCK_NAME = 'page'

interface Props {
  children: React.ReactNode,
  header: React.ReactNode,
  footer: React.ReactNode,
}

const Page = ({ header, footer, children } : Props) => {

  return (
    <div className={BLOCK_NAME}>
      <div className={`${BLOCK_NAME}__header`}>
        <div className={`${BLOCK_NAME}__header-content`}>
          {header}
        </div>
      </div>
      <div className={`${BLOCK_NAME}__content`}>
        {children}
      </div>
      <div className={`${BLOCK_NAME}__footer`}>
        {footer}
        <LanguageSwitcher />
      </div>
    </div>
  )
}

export default Page