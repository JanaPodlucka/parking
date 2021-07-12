import React, { useContext } from 'react'

import { Context } from '../Wrapper'
import { ContextPropsType } from '../Wrapper/Wrapper'

const BLOCK_NAME = 'language-switcher'

const LanguageSwitcher = () => {

  const context = useContext<ContextPropsType>(Context)

  return (
    <div className={BLOCK_NAME}>
      {/* show button for each language */}
      {context.languages.map((language: string, index: number) => {
        const isSelected = language === context.locale
        return (
          <div key={language}>
            <button
              onClick={() => context.selectLanguage(language)}
              className={
                isSelected
                  ? `${BLOCK_NAME}__button ${BLOCK_NAME}__button_selected`
                  : `${BLOCK_NAME}__button`
              }
              aria-label={`Change language to ${language.toUpperCase()}`}
              disabled={isSelected}
            >
              {language.toUpperCase()}
            </button>

            {/* show separator */}
            {index !== context.languages.length - 1 && <span className={`${BLOCK_NAME}__separator`}>/</span>}
          </div>
        )
      })}

    </div>
  )
}

export default LanguageSwitcher