# Next-Auth with TypeScript

Version NextJS 13.3 (interception route doesn't work)

Tailwind is include with config.

## Install

└─ $ ▶ pnpm create next-app --typescript

Press enter to validate every check.

└─ $ ▶ cd my-app

└─ $ ▶ pnpm add next-auth

Create auth folder with [...nextauth].ts file
/api/auth/[...nextauth].ts

## TypeScript

Already included in next-auth module !

## next-auth

Official Documentation :

https://next-auth.js.org/getting-started/typescript

GitHub [...nextauth].ts

https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/%5B...nextauth%5D.ts

Provider is different with TypeScript

Use GithubProvider as you can see below :

```
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: "read:user",
    })
  ],
})
```

GitHub : below img account > settings > developer settings > New GitHub App > GitHub > App name 

As you want

> Homepage URL 

http://localhost:3000

> Authorization callback URL

http://localhost:3000

generate & copy : `client key & client secret key`.

Create .env.local into your project

Paste keys to `.env.local`

(.env.local)

```
GITHUB_ID=...
GITHUB_SECRET=...
```

([...nextauth].ts)

```
import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
      // @ts-ignore
      scope: "read:user",
    })
  ],
})
```


└─ $ ▶ pnpm run dev

Enter: http://localhost:3000/api/auth/signin in addressbar

You should be redirect to GitHub signin.

GitHub ask you authorization to sign-in with username GitHub account.

Aswer "yes" & you will be redirect to Home page of your app.

To deconnect : http://localhost:3000/api/auth/signout

## Augmentation

you should only need to create these types at a single place, and TS should pick them up in every location where they are referenced.

(types/next-auth.d.ts)

```
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    }
  }
}
```

(pages/api/auth/[...nextauth].ts)

```
import NextAuth from "next-auth"

export default NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
})
```

(pages/index.ts)

```
import { useSession } from "next-auth/react"

export default function IndexPage() {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  const { data: session } = useSession()

  return (
    // Your component
  )
}
```

---

(dashboard.tsx) => client component

`securePage() is include into module of next-auth`

## Security server


(blog.tsx) => server component

```
import type { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'

function Blog({ data }: string) {
  const { data: session } = useSession()

  return <h1>Blog page - {data}</h1>
}

export default Blog

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //For more security read this code below!!!
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
        permanent: false
      }
    }
  }
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return {
    props: {
      data: 'List of 100 personalized blogs',
      session
    }
  }
}
```

---

## Secure API routes :

(test_session.ts)

```
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated user' })
  } else {
    res.status(200).json({ message: 'Success', session })
  }
}
```

Test this addess after signin & signout

http://localhost:3000/api/test_session

---

## Security (authentication & authorization)

Identity = authentication (to verify user)
Access = authorization (permissions of user)

Client-side authentication
Server-side authentication
API routes authentication

Persistant connection:
No need to Persist => GitHub, Google, etc.
Need to Persist => Database

---

ko@l@tr33 :koala: