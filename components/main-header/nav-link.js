'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import classes from './nav-link.module.css';



const NavLink = ({children, href}) => {

    const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>{children}</Link>
  )
}

export default NavLink