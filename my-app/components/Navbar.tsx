import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  return (
    <nav className="p-4 flex space-x-4 bg-slate-600">
      <h1 className='flex pt-1 text-xl font-bold'>
        <a href='#'>NextAuth</a>
      </h1>
      <ul className={`w-full pr-10 inline-flex justify-end ${!session && loading ? 'loading' : 'loaded'}`}>
        <li className="ml-24 text-xl font-bold">
          <Link href='/'>
            Home
          </Link>
        </li>
        <li className="ml-24 text-xl font-bold">
          <Link href='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className="ml-24 text-xl font-bold">
          <Link href='/blog'>
            Blog
          </Link>
        </li>

        {!loading && !session && (
          <li className="ml-24 text-xl font-bold">
            <Link href='/api/auth/signin'
                onClick={e => {
                  e.preventDefault()
                  signIn('github')
                }}>
                Sign In
            </Link>
          </li>
        )}
        {session && (
          <li className="ml-24 text-xl font-bold">
            <Link href='/api/auth/signout'
                onClick={e => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar