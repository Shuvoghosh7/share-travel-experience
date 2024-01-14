"use client"
import { useBlogsQuery } from "@/redux/api/blog/blogApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface RecentPostProps {
    PostCategory: string; 
  }
export default function RelatedPosts({PostCategory}:RecentPostProps) {

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);
  const [postCategory, setPostCategory] = useState<string | undefined>();
  const [status, setStatus] = useState<string>("Success");
  useEffect(() => {
    setPostCategory(PostCategory);
  }, [PostCategory]);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;
  query["PostCategory"] = postCategory;
  query["Status"] = status;
  const { data, isLoading, isError } = useBlogsQuery({ ...query });
  const blogs = data?.blogs as any;
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
