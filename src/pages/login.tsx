import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

const LoginPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Loading...</div>
  }
  if (session) {
    return (
      <>
        <div>Hello, {session.user.name}</div>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  } else {
    return (
      <>
        <div>You are not logged in</div>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
}

export default LoginPage
