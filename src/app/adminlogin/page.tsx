"use client";
import { Button, Col, Input, Row, message } from "antd";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import loginImage from '../../assets/login.png'
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { useUserLoginMutation } from "@/redux/api/authApi/authApi";


type FormValues = {
   id: string;
   password: string;
};

const LoginPage = () => {

   const [userLogin] = useUserLoginMutation();
   const router = useRouter();

   // console.log(isLoggedIn());

   const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
      try {
         const res = await userLogin({ ...data }).unwrap();
         // console.log(res);
         if (res?.accessToken) {
            router.push("/admin/ALLBLOG");
            message.success("User logged in successfully!");
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
         <Image src={loginImage}  width={600} height={600} alt="login image" />
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
                  <div
                     style={{
                        margin: "15px 0px",
                     }}
                  >
                     <FormInput
                        name="password"
                        type="password"
                        size="large"
                        label="Admin Password"
                     />
                  </div>

                  <Button type="primary" htmlType="submit">
                     Login
                  </Button>
               </Form>
            </div>
         </Col>
      </Row>
   );
};

export default LoginPage;
