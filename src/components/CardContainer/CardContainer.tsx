import React from 'react'

const BLOCK_NAME = 'card-container'

interface Props {
  children: React.ReactNode,
}

const CardContainer = ({ children } : Props) => {
  return (
    <div className={BLOCK_NAME}>
      {children}
    </div>
  )
}

export default CardContainer