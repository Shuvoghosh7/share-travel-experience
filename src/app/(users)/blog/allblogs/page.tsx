"use client"
import Head from "next/head";
import React, { useState } from "react";
import styles from "@/style/Blog.module.css";
import BlogTypes from "@/components/ui/BlogsTypes/BlogTypes";


export default function blogPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeTab, setActiveTab] = useState("Forest");

  const handleTabClick = (tabId:any) => {
    setActiveTab(tabId);
  };
  return (
    <>

      <div className={styles.blog_main_container}>
        <div className={styles.catagory_nav_menu}>
          <ul>
            <li
              onClick={() => handleTabClick("Forest")}
              className={activeTab === "Forest" ? styles.active : ""}
            >
              Forest
            </li>
            <li
              onClick={() => handleTabClick("River")}
              className={activeTab === "River" ? styles.active : ""}
            >
              River
            </li>
            <li
              onClick={() => handleTabClick("Sea_beach")}
              className={activeTab === "Sea_beach" ? styles.active : ""}
            >
              Sea beach
            </li>

            <li
              onClick={() => handleTabClick("Mountain")}
              className={activeTab === "Mountain" ? styles.active : ""}
            >
              Mountain
            </li>
            <li
              onClick={() => handleTabClick("Other")}
              className={activeTab === "Other" ? styles.active : ""}
            >
              Other
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.tab_content}>
          
              <div className="lg:mx-20 mx-6">
                <BlogTypes activeTab={activeTab}/>
              </div>
            
          </div>
          
        </div>
      </div>
    </>
  );
}

