import React from 'react'

import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const MediumClap = dynamic(() => import('../patterns/base'), {
  suspense: false,
  ssr: false
})

const Home: NextPage = () => {

  return (
    <MediumClap />
  )
}


export default Home

