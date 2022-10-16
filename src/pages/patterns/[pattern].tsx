import React, { useLayoutEffect, useState } from 'react'
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'


import { ROUTES } from '../../routes'



const Patterns: NextPage<{ pattern: string, code: string }> = ({ pattern, code }) => {
    const [Component, setComponent] = useState()

    useLayoutEffect(() => {
        import(`../../patterns/${pattern}`).then(mod => setComponent(mod.default))
    }, [pattern])


    if (!Component) return <h1>...</h1>

    return (
        <>
            {Component}

            <a href={code} target='__blank' className='cursor-pointer p-3 py-2 font-bold rounded-lg bg-primary text-black hover:bg-[#f0b753] transition-colors'>Code</a>
        </>
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
    const code = ROUTES.find(route => route.pattern === pattern)?.code


    return {
        props: { pattern, code },
    }
}


export default Patterns



