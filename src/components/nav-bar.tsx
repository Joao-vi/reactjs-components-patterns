import Link from 'next/link'

import { ROUTES } from '../routes'

const NavBar = () => {
    return (
        <ul className="flex flex-col gap-3 items-center border-r px-5 border-light-background">
            {ROUTES.map(route =>
                <li key={route.to} className="nav-link">
                    <Link href={route.to}>
                        <a>{route.label}</a>
                    </Link>
                </li>
            )}
        </ul>
    )
}

export { NavBar }