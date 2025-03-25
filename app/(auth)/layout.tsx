import React from 'react'

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <section className="auth-layout">
        {children}
    </section>
  )
}

export default AuthLayout