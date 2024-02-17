"use client";
import Form from "@/components/Forms/Form";
import React, { useState } from "react";
import { Button, Col, Row, message } from "antd";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import FormInput from "@/components/Forms/FormInput";
import UploadImage from "@/components/ui/UploadImage";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormNumberInput from "@/components/Forms/FormNumberInput";
import { useAddGuideMutation } from "@/redux/api/guide/guideApi";
import FormMultiSelectField, { SelectOptions } from "@/components/Forms/FormMultiSelectField";
import { areaOptions } from "@/constants/global";

export default function CreateGuide() {
  const [addGuide] = useAddGuideMutation();
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
      const res=await addGuide(formData).unwrap();
      if(res){
        message.success("Guide created successfully!");
        setUploadKey(Date.now());
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Create Admin</h1>

      <div className="product_create_form">
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
                name="Name"
                size="large"
                label="Name"
              />
            </div>
            {/* <div style={{ margin: "10px 0" }}>
              <FormTextArea
                name="CoverageArea"
                label="Coverage Area"
                rows={4}
              />
            </div> */}
            <div style={{ margin: "10px 0px" }}>
              <FormMultiSelectField
                options={areaOptions as SelectOptions[]}
                name="CoverageArea"
                label="Coverage Area"
              />
            </div>
            <div  style={{ margin: "10px 0" }}>
              <FormNumberInput
                type="number"
                name="PricePerDay"
                size="large"
                label="Price"
                
              />
            </div>

            <div
              className="gutter-row"
              style={{
                marginBottom: "10px",
              }}
            >
              <UploadImage key={uploadKey} name="file" />
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
