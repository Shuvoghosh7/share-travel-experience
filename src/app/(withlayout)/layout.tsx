"use client"
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/adminlogin");
    }
    setIsLoading(true);
  }, [router, isLoading,userLoggedIn]);
  const { Role } = getUserInfo() as any;
  const isAdmin = Role === "Admin";

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }
  if (!isAdmin) {
    router.push("/login");
    return null;
  }
  return (
    <Layout hasSider>
      {isAdmin && (
        <>
          <SideBar />
          <Contents>{children}</Contents>
        </>
      )}
      
    </Layout>
  );
};

export default DashboardLayout;
