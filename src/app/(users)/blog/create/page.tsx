"use client";

import Form from "@/components/Forms/Form";
import React, { useRef, useState } from "react";
import { Button, Col, Row, message } from "antd";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import FormInput from "@/components/Forms/FormInput";
import UploadImage from "@/components/ui/UploadImage";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormNumberInput from "@/components/Forms/FormNumberInput";
import { useAddblogMutation } from "@/redux/api/blog/blogApi";
import FormSelectField from "@/components/Forms/FormSelectField";
import { blogCatagory } from "@/constants/global";
import FormDatePicker from "@/components/Forms/FormDatePicker";

export default function CreateBlog() {
    const [addblog] = useAddblogMutation();
    const [uploadKey, setUploadKey] = useState(Date.now());
    const onSubmit = async (values: any) => {
        const obj = { ...values };
        const file = obj["file"];
        delete obj["file"];
        const data = JSON.stringify(obj);
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("data", data);
        message.loading("Creating...");
        try {
            await addblog(formData);
            message.success("Blog created successfully!");
            setUploadKey(Date.now());
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <div className="main_container">
            <h1 style={{ margin: "20px 0" }}>Create Blog</h1>

            <div>
                <Form submitHandler={onSubmit}>
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: "5px",
                            padding: "15px",
                            marginBottom: "10px",
                        }}
                    >
                        <div>
                            <FormInput
                                type="text"
                                name="PostTitle"
                                size="large"
                                label="Product Name"
                            />
                        </div>
                        <div style={{ margin: "10px 0" }}>
                            <FormSelectField
                                size="large"
                                name="PostCategory"
                                options={blogCatagory}
                                label="Post Category"
                                placeholder="Select"
                            />
                        </div>

                        <div style={{ margin: "10px 0" }}>
                            <FormTextArea
                                name="PostDescription"
                                label="Post Description"
                                rows={12}
                            />
                        </div>
                        <div style={{ margin: "10px 0" }}>
                            <FormDatePicker
                                name="PostDate"
                                label="Date of Post"
                                size="large"
                            />
                        </div>
                        <div>
                            <FormInput
                                type="text"
                                name="AuthorName"
                                size="large"
                                label="Author Name"
                            />
                        </div>

                        <div style={{ margin: "10px 0" }}>
                            <p style={{ margin: "10px 0" }}>Upload Blog Image</p>
                            <div
                                className="gutter-row"
                                style={{
                                    marginBottom: "10px",
                                }}
                            >
                                <UploadImage key={uploadKey}  name="file" />
                            </div>
                        </div>
                    </div>

                    <Button htmlType="submit" type="primary">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    );
}
