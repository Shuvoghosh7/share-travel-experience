"use client"
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    ReloadOutlined,
    EyeInvisibleOutlined
} from "@ant-design/icons";
import { useDeleteReservationMutation, useReservationsQuery } from "@/redux/api/reservation/reservationApi";
import { useDebounced } from "@/redux/hooks";
import { Button, message } from "antd";
import React, { useState } from "react"
import Link from "next/link";
import UMTable from "@/components/ui/UMTable";

const Reservation = () => {
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activePage, setActivePage] = useState(1);
    const [deleteReservation] = useDeleteReservationMutation();
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
    const { data, isLoading, isError } = useReservationsQuery({ ...query });

    const reservations = data?.reservations;
    const meta: any = data?.meta;
    const deleteHandler = async (id: string) => {
        message.loading("Deleting.....");
        try {
            //   console.log(data);
            await deleteReservation(id);
            message.success("Department Deleted successfully");
        } catch (err: any) {
            //   console.error(err.message);
            message.error(err.message);
        }
    };
    const columns = [
        {
            title: "Customer Name",
            dataIndex: ["customer", "FullName"],
        },
        {
            title: "Customer Number",
            dataIndex: ["customer", "Phone"],
        },
        {
            title: "CheckInDate",
            dataIndex: "CheckInDate",
        },
        {
            title: "CheckOutDate",
            dataIndex: "CheckOutDate",
        },
        {
            title: "Payment",
            dataIndex: "Payment",
        },
        {
            title: "TotalCost",
            dataIndex: "TotalCost",
        },
      
        {
            title: "Guide Name",
            dataIndex: ["guide", "Name"],
        },
   

        {
            title: "Action",
            render: function (data: any) {
                return (
                    <>
                       
                        <Link href={`/admin/reservation/edit/${data?.id}`}>
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
            <div>
                
                <h2 style={{marginBottom:"10px"}}>ALL Reservation</h2>
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
    )
};

export default Reservation;
