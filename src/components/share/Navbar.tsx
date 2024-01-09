"use client"
import React, { useEffect, useState } from "react"
import styles from "@/app/style/Navbar.module.css";
import Link from "next/link";

import Image from "next/image";
import { ImMenu } from 'react-icons/im';
import { useSelector } from "react-redux";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    let state = useSelector((state) => state);
   
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleMenuList = () => {
        setTimeout(() => {
            setMenuOpen(false);
          }, 500); 
    };
   

    useEffect(() => {
        const navbar = document.querySelector(`.${styles.navbar}`);
        const handleScroll = () => {
            if (navbar) {
                if (window.scrollY > 200) {
                    navbar.classList.add(styles.fixed);
                } else {
                    navbar.classList.remove(styles.fixed);
                }
            }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    
    return (
        <nav className={styles.navbar} >
            <div className={styles.logo}>
                <Link href="/" className={styles.menu_link}>
                    {/* <Image
                        src={himage}
                        width={100}
                        height={50}
                        alt="Picture of the author"
                        className={styles.gphoto}
                    /> */}
                    <h1>logo</h1>
                </Link>
            </div>
            <button className={styles.menuButton} onClick={toggleMenu}>
                <ImMenu/>
            </button>
            <div className={`${styles['nav-menu']} ${menuOpen ? styles.active : ''}`}>
                <ul className={styles.nav_menu_item}>
                    <li onClick={toggleMenuList}>
                        <Link href="/" className={styles.menu_link}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className={styles.menu_link}>
                            Blog List
                        </Link>
                    </li>

                    <li>
                        <Link href="/createPosts" className={styles.menu_link}>
                           Create Blog
                        </Link>
                    </li>
                   
                    <li>
                        <Link href="/product" className={styles.menu_link}>
                           Product
                        </Link>
                    </li>
                   
                    <li>
                        <Link href="/cart" className={styles.menu_link}>
                           Cart         
                        </Link>
                    </li>
                   
                   
                  
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;
