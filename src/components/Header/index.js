import Link from 'next/link'
import NavBar from '@ui/NavBar'

import TopArea from './TopArea'

export default function Header () {
  return (
    <div className="wrapper">
      <div className="top">
        <TopArea />
      </div>
      <hr />
      <div className="nav">
        <NavBar title="FlowManagement" src="/logo.png">
          <div>
            <NavLink href="/top-stories">Prueba</NavLink>
            <NavLink href="/top-stories">Prueba</NavLink>
          </div>
        </NavBar>
      </div>
      <style jsx>
        {`
        .wrapper {
          @apply bg-blue-600;
        }
        .top {
          @apply px-8 py-3;
        }
        hr {
          @apply mx-auto;
          width: 98%;
        }
        .nav {
          @apply px-8;
        }
        `}
      </style>
    </div>
  )
}

/* eslint-disable jsx-a11y/anchor-is-valid */
function NavLink ({ children, href }) {
  return (
    <Link href={href}>
      <a>
        {children}
      </a>
    </Link>
  )
}
