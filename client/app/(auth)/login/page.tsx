
import dynamic from 'next/dynamic'
import React from 'react'
const LoginForm = dynamic(() => import('./components/Form'), { ssr: false })

const page = () => {
  return (
    <><LoginForm /></>
  )
}

export default page