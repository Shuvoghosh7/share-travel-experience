"use client";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined
} from "@ant-design/icons";
import {
  useDeleteOrderMutation,
  useOrdersQuery,
} from "@/redux/api/order/orderApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Flex, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import UMTable from "@/components/ui/UMTable";
import jsPDF from "jspdf";
import { generatePDF } from "@/constants/generatePDF";

export default function Allorder() {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);
  const [deleteOrder] = useDeleteOrderMutation();
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
  const { data, isLoading, isError } = useOrdersQuery({ ...query });

  const reservations = data?.orders;
  const meta: any = data?.meta;
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      await deleteOrder(id);
      message.success("Department Deleted successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Product Name",
      dataIndex: "orderItems",
      render: (orderItems: any[]) => (
        <div>
          {orderItems.map((item, itemIndex) => (
            <p key={itemIndex}>{`${itemIndex + 1}. ${item.product}`}</p>
          ))}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "orderItems",
      render: (orderItems: any[]) => (
        <div>
          {orderItems.map((item, itemIndex) => (
            <p key={itemIndex}>{`${itemIndex + 1}) ${item.quantity}`}</p>
          ))}
        </div>
      ),
    },
    {
      title: "shipping Address",
      dataIndex: "shippingAddress",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
    },
    {
      title: "Delivery Charge",
      dataIndex: "deliveryCharge",
    },
    {
      title: "Product Price",
      dataIndex: "subtotal",
    },

    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Order Status",
      dataIndex: "OrderStatus",
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <Flex justify="space-between" align="center">

            <Link href={`/admin/allOrder/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => generatePDF(data)}
              type="primary"

            >
              <DownloadOutlined />
            </Button>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
              style={{ marginLeft: "10px" }}
            >
              <DeleteOutlined />
            </Button>
          </Flex>
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
      <div>
        <h2 style={{ marginBottom: "10px" }}>ALL Order</h2>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={reservations}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
