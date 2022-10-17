import Link from 'next/link'
import { useRouter } from 'next/router'

import { ROUTES } from '../routes'

const NavBar = () => {
    const { asPath } = useRouter()

    return (
        <ul className="overflow-auto pb-[10px] flex md:flex-col gap-3 items-center md:items-stretch text-start border-r px-5 border-light-background">
            {ROUTES.map(route =>
                <li key={route.to} className='w-full'>
                    <Link href={route.to}>
                        <a className={`nav-link ${asPath === route.to ? 'nav-link--active' : ''}`}>{route.label}</a>
                    </Link>
                </li>
            )}
        </ul>
    )
}

export { NavBar }