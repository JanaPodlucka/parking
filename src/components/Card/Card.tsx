import React from 'react'

const BLOCK_NAME = 'card'

interface Props {
  children: React.ReactNode,
}

const Card = ({ children } : Props) => {

  return (
    <div className={BLOCK_NAME}>
      {children}
    </div>
  )
}

export default Card
