"use client";
import React from "react";
import { Button, Col, Flex, Input, Row, message } from "antd";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { useUserSingupMutation } from "@/redux/api/authApi/authApi";
import loginImage from "../../assets/login.png";
import Link from "next/link";
type FormValues = {
  id: string;
  password: string;
};

const Singup = () => {
  const [userSingup] = useUserSingupMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userSingup({ ...data }).unwrap();
      // console.log(res);
      if (res) {
        message.success("User logged in successfully!");
        router.push("/login");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={600} height={600} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="Email" type="text" size="large" label="Email" />
            </div>
            <div>
              <FormInput
                name="FullName"
                type="text"
                size="large"
                label="FullName"
              />
            </div>
            <div>
              <FormInput
                name="Number"
                type="text"
                size="large"
                label="Number"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>
            <Flex justify="space-between" align="center">
              <Button type="primary" htmlType="submit">
                Singup
              </Button>
              <Button type="primary" htmlType="submit">
               <Link href="/login">Already have an account?</Link>
              </Button>
            </Flex>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Singup;
