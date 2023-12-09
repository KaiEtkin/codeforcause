'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const page = ({
    params}) => {
    const router = useRouter()

  return (
    <div>{params.book}</div>
  )
}

export default page