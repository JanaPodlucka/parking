import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'

import Cs from '../../lang/cs.json'
import En from '../../lang/en.json'

export type ContextPropsType = {
  locale: string,
  selectLanguage(language: string): void,
  languages: Array<string>,
}

interface Props {
  children: React.ReactNode,
}

export const Context = React.createContext<ContextPropsType>({
  locale: 'en',
  languages: ['en'],
  selectLanguage: () => {}
})

const local = navigator.language

// find default language
let lang = En
if (local === 'cs') {
  lang = Cs
}

const Wrapper = ({ children } : Props) => {
  const languages = ['cs', 'en']
  const [locale, setLocale] = useState(languages.includes(local) ? local : 'en')
  const [messages, setMessages] = useState(lang)

  const selectLanguage = (language: string) => {
    const newLocale = language
    setLocale(newLocale)
    if (newLocale === 'cs') {
      setMessages(Cs)
    } else {
      setMessages(En)
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage, languages }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export default Wrapper