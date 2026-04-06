import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import Navbar from './utility/Navbar';
import ScrollUpBt from './utility/ScrollUpButton';
import NavbarCategorized from './utility/NavbarCategorized';

const Rule = () => <hr className="border-t border-gray-200 my-0" />;
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
    {/* ══════════════════════════════════════
            FOOTER — light, clean (Senseable-style)
            ══════════════════════════════════════ */}
        <footer className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-6 sm:px-10 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm mb-10">

              <div>
                <p className="font-semibold text-gray-900 mb-1 text-base">
                  Spacetime Intelligence Laboratory
                </p>
                <p className="text-xs text-gray-400 font-light">
                  KAIST · Civil and Environmental Engineering
                </p>
                <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500">
                  <Link to="/research"      className="hover:text-gray-900 hover:underline font-light">Research</Link>
                  <Link to="/publications"  className="hover:text-gray-900 hover:underline font-light">Publications</Link>
                  <Link to="/people"        className="hover:text-gray-900 hover:underline font-light">People</Link>
                  <Link to="/projects"      className="hover:text-gray-900 hover:underline font-light">Projects</Link>
                  <Link to="/events"        className="hover:text-gray-900 hover:underline font-light">Events</Link>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Address</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  W16 #410, KAIST<br />
                  291 Daehak-ro, Yuseong-gu<br />
                  Daejeon, Republic of Korea
                </p>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Contact</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  TEL: +82-42-350-3615<br />
                  yoonjin@kaist.ac.kr
                </p>
              </div>

            </div>

            <Rule />

            <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-400 font-light">
                © {new Date().getFullYear()} Spacetime Intelligence Laboratory, KAIST
              </p>
              <p className="text-xs text-gray-300 font-light">
                Department of Civil and Environmental Engineering
              </p>
            </div>
          </div>
        </footer>
    {/* <footer className="py-8 flex flex-col items-center bg-slate-800 text-slate-200 w-full">
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
      </footer> */}
</div>
</div>

    )
}

export default Layout
