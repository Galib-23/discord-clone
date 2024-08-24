import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-black'>
      {children}
    </div>
  )
}

export default AuthLayout