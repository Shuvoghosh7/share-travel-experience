"use client";
import React from "react";
import styles from "@/style/Banner.module.css";
import slider1 from "../../assets/banner/banner-1.png";
import slider2 from "../../assets/banner/banner-2.png";
import slider3 from "../../assets/banner/banner-3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <div>
      <div className={styles.video_container}>
        <Slider {...settings}>
          <div className={styles.slider_container_1}>
            {/* <Image src={slider1} width={300} height={300} alt={""} /> */}
            <div className={styles.overlay}>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, culpa?
              </h1>
              <button className={styles.see_all_btn}>
                <Link href="/blog/blogs" className={styles.link_btn}>SEE ALL BLOG</Link>
              </button>
            </div>
          </div>
          <div className={styles.slider_container_2}>
            <div className={styles.overlay}>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, culpa?
              </h1>
              <button className={styles.see_all_btn}>
                <Link href="/blog/blogs" className={styles.link_btn}>SEE ALL BLOG</Link>
              </button>
            </div>
          </div>
          <div className={styles.slider_container_3}>
            <div className={styles.overlay}>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, culpa?
              </h1>
              <button className={styles.see_all_btn}>
                <Link href="/blog/blogs" className={styles.link_btn}>SEE ALL BLOG</Link>
              </button>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
