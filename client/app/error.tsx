"use client"
import Container from '@/components/reusables/contents/Container'
import Heading from '@/components/reusables/contents/Heading'
import Wrapper from '@/components/reusables/contents/Wrapper'
import React from 'react'
import Link from "next/link"
const Error = () => {
  return (
    <Wrapper className="text-center"><Container className=''><Heading subTitleClassName='mt-5' align='text-center' parts={[{ text: "Something", isSpan: true, spanClassName: "bg-primary text-white p-2 rounded-lg" }, { text: " went wrong!" }]} subTitle="Please try again later." /> <Link className="text-blue-500" href='/'>Go Home</Link></Container></Wrapper>
  )
}

export default Error