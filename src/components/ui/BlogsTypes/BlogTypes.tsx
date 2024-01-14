"use client";
import React, { useEffect, useState } from "react";
import styles from "@/style/Blog.module.css";
import { useDebounced } from "@/redux/hooks";
import { useBlogsQuery } from "@/redux/api/blog/blogApi";
import Loading from "@/app/loading";
import ShowBlogType from "./ShowBlogType";
export default function BlogTypes({ activeTab }: any) {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(6);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);
  const [postCategory, setPostCategory] = useState<string | undefined>();

  const [status, setStatus] = useState<string>("Success");
  useEffect(() => {
    setPostCategory(activeTab);
  }, [activeTab]);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;
  query["PostCategory"] = postCategory;
  query["Status"] = status;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading, isError } = useBlogsQuery({ ...query });
  const blogs = data?.blogs as any;
  const meta: any = data?.meta;

  let content = null;
  if (isLoading) {
    content = (
      <div>
        <Loading />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = "There was an error";
  }

  if (!isLoading && !isError && blogs?.length === 0) {
    content = "No Product found!";
  }

  if (!isLoading && !isError && blogs?.length > 0) {
    content = blogs?.map((item: any) => (
      <ShowBlogType key={item.id} item={item} />
    ));
  }
  return (
    <div>
      
      <div className={styles.blogcartcontainer}>{content}</div>

      <div className={styles.pagination_container}>
        {Array.from({ length: Math.ceil(meta?.total / size) }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pagination_item} ${
              index + 1 === activePage ? styles.pagination_active_item : ""
            }`}
            onClick={() => {
              setActivePage(index + 1);
              setPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
