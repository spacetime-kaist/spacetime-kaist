import React from 'react'
import { Outlet } from 'react-router-dom'

// Styled components
import Navbar from './components/Navbar';

function Layout() {
    return (
<div className="flex flex-col justify-center items-center overflow-hidden">
<div className={` w-screen min-h-[100vh] bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat`}>
    <Navbar />
    <div className="min-h-screen bg-gray-50 text-gray-900">
    <main>
    <section className="pt-20 pb-16">
    <div className="page">
       <Outlet />
    </div>
    </section>
    </main>
    </div>
    <footer className="py-8">
        <div className="container">
        <div className='color-white p-4'>
        <h2>Spacetime Intelligence Laboratory</h2>
        <h3>Contact</h3>
        <p>
          Address: W16 #407, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon, Republic
          of Korea
          <br />
          TEL: +82-42-350-5655
          <br />
          E-mail: spacetime@kaist.ac.kr
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