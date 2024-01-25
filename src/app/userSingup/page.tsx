"use client";
import { Button, Col, Flex, Input, Row, message } from "antd";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import singupImage from '../../assets/Sign up.png'
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { useUserSingupMutation } from "@/redux/api/authApi/authApi";
import Link from "next/link";


type FormValues = {
    id: string;
    password: string;
};

const SingupPage = () => {

    const [userSingup] = useUserSingupMutation();
    const router = useRouter();

    // console.log(isLoggedIn());

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        try {
            const res = await userSingup({ ...data }).unwrap();
            // console.log(res);
            if (res) {
                router.push("/login");
                message.success("User Singup in successfully!");
            }
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
                <Image src={singupImage} width={600} height={600} alt="login image" />
            </Col>
            <Col sm={12} md={8} lg={8}>
                <h1
                    style={{
                        margin: "15px 0px",
                        textAlign: "center"
                    }}
                >
                    Singup
                </h1>
                <div>
                    <Form submitHandler={onSubmit}>
                        <div>
                            <FormInput name="Email" type="text" size="large" label="Email" />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <FormInput name="FullName" type="text" size="large" label="FullName" />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <FormInput name="Number" type="text" size="large" label="Number" />
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

                        <Flex justify="space-between" align="center">
                            <Button type="primary" htmlType="submit">
                                Singup
                            </Button>
                            <div>
                                <Link href="/login">Already have An Account Login</Link>
                            </div>
                        </Flex>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default SingupPage;
