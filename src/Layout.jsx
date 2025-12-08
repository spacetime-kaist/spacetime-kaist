import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './utility/Navbar';
import ScrollUpBt from './utility/ScrollUpButton';
import NavbarCategorized from './utility/NavbarCategorized';

function Layout() {
    return (
<div id='top' className="font-display flex flex-col justify-center items-center overflow-hidden">
    <div className="w-screen min-h-[100vh] min-w-[320px] bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat">
    {/* Invisible div to fix navbar overlapping content */}
    <div className="w-full h-16"/>
    {/* Switch between Navbar and NavbarNew to compare */}
    {/* <Navbar /> */}
    <NavbarCategorized />
    <ScrollUpBt />
    <div className="min-h-screen bg-gray-50 text-gray-900">
    <main>
    <section className="pt-20 pb-16">
    <div className="page">
       <Outlet />
    </div>
    </section>
    </main>
    </div>
    <footer className="py-8 flex flex-col items-center bg-slate-800 text-slate-200 w-full">
        <div className="container">
        <div className='color-white p-8'>
        <h2 className='text-2xl font-bold text-sky-700 py-3'>Spacetime Intelligence Laboratory</h2>
        <h3 className='text-xl font-semibold text-slate-500 pb-2'>Contact</h3>
        <p>
          Address: W16 #410, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon, Republic
          of Korea
          <br />
          TEL: +82-42-350-3615
          <br />
          E-mail: yoonjin@kaist.ac.kr
        </p>
      </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">© {new Date().getFullYear()} Spacetime Intelligence Laboratory. All rights reserved.</div>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
</div>
</div>

    )
}

export default Layout