import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header.attrs({ className: 'w-full py-2 bg-white/80 backdrop-blur-sm shadow-sm' })``;
const Container = styled.div.attrs({ className: 'max-w-6xl mx-auto px-6' })``;
const Nav = styled.nav.attrs({ className: 'flex items-center justify-between' })``;
const NavLinks = styled.div.attrs({ className: 'hidden md:flex gap-6 items-center text-md' })``;
const Button = styled.button.attrs({ className: 'inline-block px-4 py-2 rounded-md text-sm font-medium' })``;
const StyledLink = styled(Link).attrs({ className: 'hover:underline' })``;

import stil_logo from '../../assets/stil_logo_1_1.png'
import { IoIosSearch } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"


function Navbar() {
  return (
      <Header>
        <Container>
          <Nav>
            <Link to="/" className='no-tracking-tight basis-1/8'>
                <img src={stil_logo} alt="STIL Logo" className='min-w-24' /></Link>
            <div className="flex items-center gap-4">
              <NavLinks>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/publications">Publications</StyledLink>
                <StyledLink to="/people">People</StyledLink>
                <StyledLink to="/research">Research</StyledLink>
                <StyledLink to="/projects">Projects</StyledLink>
                <StyledLink to="/events">Events</StyledLink>
              </NavLinks>
            <div className="block md:hidden">
              <Button className="bg-sky-600 text-xl text-white hover:bg-blue-700"><IoMenuSharp /></Button>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 hover:bg-blue-400 cursor-pointer">
              <Button className="text-xl hover:text-white"><IoIosSearch /></Button>
            </div>
            </div>
          </Nav>
        </Container>
      </Header>
      )
}
export default Navbar;