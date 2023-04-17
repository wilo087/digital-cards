import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Login ({ children }: Props): React.ReactElement {
  return (
    <main>
      {children}
    </main>
  )
}
