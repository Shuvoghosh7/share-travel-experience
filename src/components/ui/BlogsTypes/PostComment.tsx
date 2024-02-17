import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/style/Blog.module.css";
import { message } from "antd";
export default function PostComment({ id }: any) {
  const { handleSubmit, control, register, reset } = useForm();

  const onSubmit = async (data: any) => {
    data.PostId = id;
    try {
      const response = await fetch(
        "https://sharetravelexperienceserver-production.up.railway.app/api/v1/comment/create_comment",
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
        throw new Error("Failed to create Comment");
      }
      if(response.ok){
        message.success("Comment created successfully!");
      }

      const responseData = await response.json();

      reset();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className={styles.create_comment_container}>
        <h3 className={styles.post_comment}>Leave Your Comment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.comment_name}>
            <input
              type="text"
              className={styles.form_control}
              placeholder="Name*"
              {...register("Name", { required: true })}
            />
            <input
              type="email"
              className={`${styles.form_control} lg:ml-12`}
              style={{marginLeft:"20px"}}
              placeholder="Email*"
              {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          <div>
            <textarea
              className={styles.form_control_textarea}
              placeholder="Write Your Comment"
              {...register("Comments", { required: true })}
            ></textarea>
          </div>

          <div>
            <input
              type="submit"
              value="POST YOUR COMMENT"
              className={styles.form_submit_btn}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
