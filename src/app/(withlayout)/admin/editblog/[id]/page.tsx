"use client"
import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectField";
import { blogOptions } from "@/constants/global";
import { useUpdateBlogMutation } from "@/redux/api/blog/blogApi";
import { Button, message } from "antd";
import React from "react"

const EditBlog = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const [updateBlog] = useUpdateBlogMutation()
    const onSubmit = async (values: any) => {
        message.loading("Updating.....");
        try {
            // console.log(values);
            await updateBlog({ id, body: values });
            message.success("Status updated successfully");
        } catch (err: any) {
            //   console.error(err.message);
            message.error(err.message);
        }
    };
    return (
        <div style={{margin:"20px 100px"}}>
            <Form submitHandler={onSubmit} >
                <FormSelectField
                    size="large"
                    name="Status"
                    options={blogOptions}
                    label="Change Status"
                    placeholder="Select"
                />
                <Button type="primary" htmlType="submit" style={{marginTop:"10px"}}>
                    Update
                </Button>
            </Form>

        </div>
    )
};

export default EditBlog;
