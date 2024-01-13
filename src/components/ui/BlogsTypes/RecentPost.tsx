"use client"
import { useBlogsQuery } from "@/redux/api/blog/blogApi";
import Link from "next/link";
import React, { useState } from "react";

export default function RecentPost() {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);
  const [getAllData, setGetAllData] = useState("");
  const [status, setStatus] = useState<string>("Success");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["Status"] = status;

  const {
    data: allBlogs,
    isLoading: allLoading,
    isError,
  } = useBlogsQuery({ ...query });

  const blogs = allBlogs?.blogs as any;
  const meta: any = allBlogs?.meta;

  return (
    <div>
     
      {blogs?.map((item: any) => (
        // eslint-disable-next-line react/jsx-key
       <ul>
        <li> <Link href={`/blog/${item.id}`}>{item.PostTitle}</Link></li>
       </ul>
      ))}
    </div>
  );
}
