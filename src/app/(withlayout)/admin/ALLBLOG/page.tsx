"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useBlogsQuery, useDeleteblogMutation } from "@/redux/api/blog/blogApi";
import { useDebounced } from "@/redux/hooks";
import { Button, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import UMTable from "@/components/ui/UMTable";

export default function ALLBLOG() {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(2);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);
  const [deleteblog] = useDeleteblogMutation();
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
  const { data, isLoading, isError } = useBlogsQuery({ ...query });

  const blogs = data?.blogs;
  const meta: any = data?.meta;
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      await deleteblog(id);
      message.success("Department Deleted successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "PostTitle",
      dataIndex: "PostTitle",
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
    {
      title: "AuthorName",
      dataIndex: "AuthorName",
    },
    {
      title: "PostCategory",
      dataIndex: "PostCategory",
    },
    {
      title: "PostDate",
      dataIndex: "PostDate",
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/department/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  return (
    <div>
      ALLBLOG
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={blogs}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
}
