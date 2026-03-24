import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function LinkButton({linkto, text}) {
  return (
    <Link to={linkto} className='inline-flex my-6 px-3 py-2 bg-slate-700 text-white rounded-md text-sm font-semibold hover:bg-gray-500 hover:text-grey-300'>
        <div className='flex flex-row justify-center items-center'>
        <div className='mx-1'>{text}</div>
        <div><IoChevronForwardOutline /></div>
        </div>
    </Link>
  )
}