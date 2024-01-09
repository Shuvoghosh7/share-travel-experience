"use client";
import Products from "@/components/ui/Products";
import { useProductsQuery } from "@/redux/api/product/productApi";
import { useDebounced } from "@/redux/hooks";
import React, { useState } from "react";
import styles from "@/app/style/Product.module.css";
import { IMeta } from "@/types";
export default function Product() {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(2);
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
  const { data, isLoading,isError } = useProductsQuery({ ...query });

  const products = data?.products;
  const meta:any = data?.meta;
 
  let content = null;

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
      <input
          type="text"
          placeholder="Search..."
          style={{
            width: "20%",
            border:"2px solid black"
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
     <div className={styles.product_container}>{content}</div>
     <div className="mt-5">
        {Array.from({ length: Math.ceil(meta?.total / size) }, (_, index) => (
          <button
            key={index + 1}
            className={`bg-red-400 py-1 px-2 ml-3 ${
              index + 1 === activePage ? 'bg-blue-400' : ''
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
