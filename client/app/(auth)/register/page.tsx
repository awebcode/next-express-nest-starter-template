import dynamic from 'next/dynamic'
import React from 'react'
const RegisterForm = dynamic(() => import('./components/Form'), { ssr: false })
const page = () => {
    
    return (
        <><RegisterForm /></>
    )
}

export default page