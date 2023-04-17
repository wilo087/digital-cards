import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

interface params extends Params {
  uuid?: string[] | number[]
}

export const metadata = {
  title: 'Card Data'
}

export default function Profile ({ params }: params): React.ReactElement {
  const { uuid } = params

  return (
    <main className={styles.main}>
      Profile page

      <Link href='/'>Go back {uuid}</Link>
    </main>
  )
}
