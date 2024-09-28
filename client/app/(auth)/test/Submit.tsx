"use client"
import { Input } from '@/components/ui/input'
import React, { useActionState } from 'react'
// import { useFormState, useFormStatus } from 'react-dom'
import { formAction } from './action'
import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'

const SubmitForm = () => {
    const [state, action,isPending] = useFormState(formAction, {message:"init"})
    console.log({state})
    return (
    
        <form action={action}>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="Email" />
          <button disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</button>
            {state && <p>{JSON.stringify(state)}</p>}
        </form>
      
    );
}

export default SubmitForm