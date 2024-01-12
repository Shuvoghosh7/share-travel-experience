"use client";
import { Layout } from "antd";
import UMBreadCrumb from "./UMBreadCrumb";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams} from 'next/navigation'


const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  const pathname = usePathname()
  const[urls,setUrl]=useState<string | any>();
  function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    useEffect(() => {
      // Remove the "/admin/" prefix from the pathname
      const cleanPathname = pathname.replace('/admin/', '');
  
      const queryString = searchParams.toString();
      const url = queryString ? `${cleanPathname}?${queryString}` : cleanPathname;
      setUrl(url)
      console.log(url);
      // You can now use the modified URL
      // ...
    }, [pathname, searchParams]);
  
    return null;
  }

  NavigationEvents();

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
            label: `${urls}`,
            link: `${urls}`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
