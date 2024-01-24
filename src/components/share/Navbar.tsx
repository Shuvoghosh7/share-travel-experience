"use client";
import React, { useEffect, useState } from "react";
import styles from "@/style/Navbar.module.css";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { ImMenu } from "react-icons/im";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname()
  const checkuser = isLoggedIn()
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [totalProduct, setTotalProduct] = useState<any | null>(0);
  const state = useAppSelector((state) => state);
  const carts = state.carts.carts;

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
    const carts = state.carts.carts;
    setTotalProduct(carts);
  }, []);

  useEffect(() => {
    setTotalProduct(carts);
  }, [carts]);

  const logout = () => {
    return removeUserInfo(authKey)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.menu_link}>
          <Image
            src={logo}
            width={100}
            height={50}
            alt="Picture of the author"
            className={styles.gphoto}
          />
        </Link>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <ImMenu />
      </button>
      <div className={`${styles["nav-menu"]} ${menuOpen ? styles.active : ""}`}>
        <ul className={styles.nav_menu_item}>
          <li onClick={toggleMenuList}>
            <Link href="/" className={`${styles.menu_link} ${pathname === '/' ? styles.activenav : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog/allblogs" className={`${styles.menu_link} ${pathname === '/blog/allblogs' ? styles.activenav : ''}`}>
              Blog List
            </Link>
          </li>

          <li>
            <Link href="/blog/create" className={`${styles.menu_link} ${pathname === '/blog/create' ? styles.activenav : ''}`}>
              Share Stories
            </Link>
          </li>

          <li>
            <Link href="/product" className={`${styles.menu_link} ${pathname === '/product' ? styles.activenav : ''}`}>
              Product
            </Link>
          </li>

          <li>
            <Link href="/cart" className={`${styles.menu_link} ${pathname === '/cart' ? styles.activenav : ''}`}>
              Cart({totalProduct.length > 0 ? totalProduct.length : 0})
            </Link>
          </li>
          <li>

            <Link href="/userOrder" className={`${styles.menu_link} ${pathname === '/cart' ? styles.activenav : ''}`}>
              Order
            </Link>
          </li>
          <li>
            {checkuser ? <button onClick={logout}>Logout</button> : ''}
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
