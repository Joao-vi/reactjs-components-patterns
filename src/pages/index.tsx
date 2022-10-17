import React from 'react'

import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'

const MediumClap = dynamic(() => import('../patterns/base'), {
  suspense: false,
  ssr: false
})

const Home: NextPage = () => {

  return (
    <AnimatePresence>
      <motion.div
        key='home'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <MediumClap />
      </motion.div>
    </AnimatePresence>
  )
}


export default Home

