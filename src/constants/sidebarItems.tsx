import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {



  const adminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/createProduct`}>Create Product</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-student`,
    },
    {
      label: <Link href={`/${role}/createGuide`}>Create Guide</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-faculty`,
    },
    {
      label: <Link href={`/${role}/ALLBLOG`}>ALL BLOG</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-ALLBLOG`,
    },
    {
      label: <Link href={`/${role}/reservation`}>Reservation</Link>,
      icon: <TableOutlined />,
      key: `/${role}/reservation`,
    },
  ];


 

  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
 
};
