"use client";
import { Layout } from "antd";
import UMBreadCrumb from "./UMBreadCrumb";


const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";

  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <UMBreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: "Admin",
            link: `/${base}/admin`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
