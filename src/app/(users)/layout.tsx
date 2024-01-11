"use client"
import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar/>
      <div>{children}</div>
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
