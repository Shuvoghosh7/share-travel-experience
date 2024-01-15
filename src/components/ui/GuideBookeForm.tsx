"use client"
import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/style/BookedGuide.module.css";
import Swal from "sweetalert2";
import { GuideType } from "@/types";
import { useAddReservationMutation } from "@/redux/api/reservation/reservationApi";
export default function GuideBookeForm({guideData}:GuideType | any) {
   
  const { register, handleSubmit, setValue, watch,reset } = useForm();

  const watchCheckIn = watch("CheckInDate");
  const watchCheckOut = watch("CheckOutDate");
  const calculateTotalCost = () => {
    const CheckInDate = watchCheckIn;
    const CheckOutDate = watchCheckOut;

    if (CheckInDate && CheckOutDate) {
      const checkInDate = new Date(CheckInDate);
      const checkOutDate = new Date(CheckOutDate);

      const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      const totalPrice = differenceInDays * guideData.PricePerDay;
      setValue("TotalCost", totalPrice);
    }
  };
  const[addReservation]= useAddReservationMutation();
  const onSubmit:any= async (data: { GuideID: any; Payment: string; }) => {
    // Handle form submission here with the form data
    data.GuideID = guideData.id;
    data.Payment = "Pending";
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/reservation/create_reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // Handle error when the response is not successful
        throw new Error("Failed to create rooms");
      }

      const responseData = await response.json();

      // Assuming Swal is imported properly elsewhere
      Swal.fire({
        title: "Good job!",
        text: "Your Booked successfully Done!",
        icon: "success",
      });
      reset();
    } catch (error:any) {
      // Handle other errors or display error message in a modal/dialog
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.guide_booked_form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <label>FullName</label>
          <input
            {...register("customerData.FullName", { required: true })}
            type="text"
            className={styles.form_control}
            placeholder="Please enter your FullName"
          />
        </div>
        <div className={styles.form_group}>
          <label>E-mail</label>
          <input
            {...register("customerData.Email", { required: true })}
            type="text"
            className={styles.form_control}
            placeholder="Please enter your E-mail"
          />
        </div>
        <div className={styles.form_group}>
          <label>Phone</label>
          <input
            {...register("customerData.Phone", { required: true })}
            type="text"
            className={styles.form_control}
            placeholder="Please enter your E-mail"
          />
        </div>
        <div className={styles.form_group}>
          <label>Address</label>
          <input
            {...register("customerData.Address", { required: true })}
            type="text"
            className={styles.form_control}
            placeholder="Please enter your E-mail"
          />
        </div>

     
          <div className={`${styles.form_group} mt-3`}>
            <label>Check-in</label>
            <input
              {...register("CheckInDate", { required: true })}
              type="date"
              className={styles.form_control_date}
              placeholder="Please enter your E-mail"
            />
          </div>

          <div className={`${styles.form_group} mt-3`}>
            <label>Check-out</label>
            <input
              {...register("CheckOutDate", { required: true })}
              type="date"
              className={styles.form_control_date}
            />
          </div>
    

        <div className={`${styles.form_group} mt-3`}>
          <label>TotalCost</label>
          <input
            {...register("TotalCost", {
              valueAsNumber: true,
            })}
            type="number"
            className={styles.form_control}
            placeholder="Please enter your Adults"
            defaultValue={
              watchCheckIn && watchCheckOut ? calculateTotalCost() : ""
            }
          />
        </div>

        <div className={`${styles.form_group}`} style={{marginTop:"20px"}}>
          <button type="submit" className={styles.form_control_btn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
