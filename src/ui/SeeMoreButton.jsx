import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function SeeMoreButton({linkto}) {
  return (
    <Link to={linkto} className='inline-flex items-center mx-1 my-6 px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-slate-800 hover:text-grey-300'>
        <div className='flex flex-row justify-center items-center'>
        <div className='mx-1'>See More</div>
        <div><IoChevronForwardOutline /></div>
        </div>
    </Link>
  )
}