import React, { useEffect, useLayoutEffect, useState } from 'react'
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { AnimatePresence, motion } from 'framer-motion'


import { ROUTES } from '../../routes'


interface PatterProps {
    pattern: string;
    code: string;
    title: string;
}

const Patterns: NextPage<PatterProps> = ({ pattern, code, title }) => {
    const [Component, setComponent] = useState()

    useEffect(() => {
        import(`../../patterns/${pattern}`).then(mod => setComponent(mod.default))
    }, [pattern])


    if (!Component) return <h1>...</h1>

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={code}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
            >

                {Component}

                <motion.span
                    key={pattern}
                    className="italic text-light-text"
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: .4, ease: "easeOut" } }}
                    exit={{ opacity: 0 }}
                >
                    {title}
                </motion.span>
            </motion.div>


            <motion.a
                key={title}
                initial={{ opacity: 0, scale: .6 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: .15 } }}
                exit={{ opacity: 0 }}
                href={code}
                target='__blank'
                className='cursor-pointer p-3 py-2 font-bold rounded-lg bg-primary text-black hover:bg-[#f0b753] transition-colors'
            >
                Code
            </motion.a>
        </AnimatePresence>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const paths = ROUTES.map(({ pattern }) => ({ params: { pattern } }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { pattern } = context.params || { pattern: 'HOC' };
    const { title, code } = ROUTES.find(route => route.pattern === pattern)!


    return {
        props: { pattern, code, title },
    }
}


export default Patterns



