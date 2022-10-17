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
        className='flex flex-col gap-10 items-center'
        key='home'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <MediumClap />

        <motion.a
          initial={{ opacity: 0, scale: .6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: .15 } }}
          exit={{ opacity: 0 }}
          href={'https://github.com/Joao-vi/reactjs-components-patterns/blob/main/src/patterns/base.tsx'}
          target='__blank'
          className='max-w-max cursor-pointer p-3 py-2 font-bold rounded-lg bg-primary text-black hover:bg-[#f0b753] transition-colors'
        >
          Code
        </motion.a>
      </motion.div>
    </AnimatePresence>
  )
}


export default Home

