
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/logo.png';
import classes from './main-header.module.css';
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

const MainHeader = () => {

  return (
    <>
    <MainHeaderBackground />
    <header className={classes.header}>
        <Link href='/' className={classes.logo}>
            <Image src={logo} alt='A plate with food' priority/>
            TasteTrail Food
        </Link>
        <nav className={classes.nav}>
        <ul>
            <li>
                <NavLink href='/meals'>Browse Meals</NavLink>
            </li>
            <li>
                <NavLink href='/community'>TasteTrail Community</NavLink>
            </li>
        </ul>
        </nav>
    </header>
    </>
  )
}

export default MainHeader