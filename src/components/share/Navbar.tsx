"use client";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styles from "@/style/Navbar.module.css";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { ImMenu } from "react-icons/im";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { getUserInfo, isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Avatar, Button, Dropdown, MenuProps, Row, Space } from "antd";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname()
  const checkuser = isLoggedIn()
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState<string>('');
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

  const { FullName } = getUserInfo() as any;

  useEffect(() => {
    setTotalProduct(carts);
    setUserName(FullName)
  }, [carts,FullName]);
 
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
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
            <Row
              justify="end"
              align="middle"
              style={{
                height: "100%",
              }}
            >
              <p
                style={{
                  margin: "0px 5px",
                  color:"#fd7e14",
                  fontSize:"18px",
                  fontWeight:"bold"
                }}
              >
                {userName}
              </p>
              <Dropdown menu={{ items }}>
                <a>
                  <Space wrap size={16}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Space>
                </a>
              </Dropdown>
            </Row>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
