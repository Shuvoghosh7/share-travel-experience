"use client"
import React from "react"
import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectField";
import { Button, message } from "antd";
import { useUpdateReservationMutation } from "@/redux/api/reservation/reservationApi";
import { reservationPayment } from "@/constants/global";
const EidReservation = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [updateReservation] = useUpdateReservationMutation()
    const onSubmit = async (values: any) => {
        message.loading("Updating.....");
        try {
            // console.log(values);
            await updateReservation({ id, body: values });
            message.success("Payment Status updated successfully");
        } catch (err: any) {
            //   console.error(err.message);
            message.error(err.message);
        }
    };
  return (
    <div>
        <h1>Show:{id}</h1>
        <div style={{margin:"20px 100px"}}>
            <Form submitHandler={onSubmit} >
                <FormSelectField
                    size="large"
                    name="Payment"
                    options={reservationPayment}
                    label="Change Status"
                    placeholder="Select"
                />
                <Button type="primary" htmlType="submit" style={{marginTop:"10px"}}>
                    Update
                </Button>
            </Form>

        </div>
      
    </div>
  )
};

export default EidReservation;
