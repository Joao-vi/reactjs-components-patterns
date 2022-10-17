import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'

import { Footer } from '../components/footer'
import { NavBar } from '../components/nav-bar'

import '../index.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <main className='w-full h-full max-w-[762px] mx-auto flex flex-col py-10'>
      <section className='flex-1 flex flex-col md:flex-row items-stretch justify-items-stretch'>
        <NavBar />
        <article className='relative flex-1 flex flex-col gap-8 justify-center items-center m-4 bg-[#333332] rounded shadow-md'>

          <span className='absolute top-[15%] italic text-light-text border-b border-primary rounded px-3 py-1'>Click and hold!</span>
          <Component {...pageProps} />
        </article>
      </section>

      <Footer />
    </main >
  )
}

export default MyApp
