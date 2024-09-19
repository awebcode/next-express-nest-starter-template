"use client"
import Container from '@/components/reusables/contents/Container'
import Heading from '@/components/reusables/contents/Heading'
import Wrapper from '@/components/reusables/contents/Wrapper'
import React from 'react'
import Link from "next/link"
const Error = () => {
  const spanClassName = "bg-primary text-white  p-2 rounded-lg"
  return (
    <Wrapper className="text-center bg-white  btn">
      <Container>
        <Heading
          className='text-red-500'
          subTitleClassName='mt-5 text-3xl flex-center'
          align='text-center' parts={[{ text: "Something", isSpan: true, spanClassName }, { text: " went wrong!" }]}
          subTitle="Please try again later." /> <Link className="text-blue-500" href='/'>Go Home</Link>
      </Container>
    </Wrapper>
  )
}

export default Error