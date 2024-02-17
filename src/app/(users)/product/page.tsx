"use client";
import Products from "@/components/ui/Products";
import { useProductsQuery } from "@/redux/api/product/productApi";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";
import styles from "@/style/Product.module.css";
import { IMeta } from "@/types";
import { Spin } from "antd";
import Loading from "@/app/loading";
export default function Product() {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(8);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading, isError } = useProductsQuery({ ...query });

  const products = data?.products;
  const meta: any = data?.meta;

  let content = null;
  if (isLoading) {
    content =<div><Loading/></div>
  }
  if (!isLoading && isError) {
    content = "There was an error";
  }

  if (!isLoading && !isError && products?.length === 0) {
    content = "No Product found!";
  }

  if (!isLoading && !isError && products?.length > 0) {
    content = products.map((item: any) => (
      <Products key={item.id} item={item} />
    ));
  }
  return <div className="main_body">
    <h1 className={styles.product_page_title}>All Product</h1>
    <div className={styles.product_search_input}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "20%",
          border: "2px solid black"
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}

      />
    </div>

    <div className={styles.product_container}>{content}</div>
    <div className={styles.pagination_container}>
      {Array.from({ length: Math.ceil(meta?.total / size) }, (_, index) => (
        <button
          key={index + 1}
          className={`${styles.pagination_item} ${index + 1 === activePage ? styles.pagination_active_item : ''
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
  </div>;
}
