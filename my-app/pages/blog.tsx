import type { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'

function Blog({ data }: string) {
  const { data: session } = useSession()

  return <h1>Blog page - {data}</h1>
}

export default Blog

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog',
        permanent: false
      }
    }
  }
  return {
    props: {
      data: 'List of 100 personalized blogs',
      session
    }
  }
}
