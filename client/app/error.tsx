"use client"
import Container from '@/components/reusables/contents/Container'
import Heading from '@/components/reusables/contents/Heading'
import Wrapper from '@/components/reusables/contents/Wrapper'
import React from 'react'
import Link from "next/link"
import { useEffect } from 'react'
import PrimaryButton from '@/components/reusables/buttons/PrimaryButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const spanClassName = "bg-primary text-white  p-2 rounded-lg"
  return (
    <Wrapper className="text-center">
      <Container>
        <Heading
          className='text-red-500'
          subTitleClassName='mt-5 text-3xl flex-center'
          align='text-center' parts={[{ text: "Something", isSpan: true, spanClassName }, { text: " went wrong!" }]}
          subTitle="Please try again later." />
        <Link className="text-blue-500" href='/'>Go Home</Link>
        <PrimaryButton
          isOutlineAnimation
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </PrimaryButton>
      </Container>
    </Wrapper>
  )
}
