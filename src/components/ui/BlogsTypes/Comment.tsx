import { useCommentQuery } from "@/redux/api/comment/commentApi";
import React from "react";
import styles from "@/style/Blog.module.css";

export default function Comment({ id }: any) {
  const { data, isLoading, isError, refetch } = useCommentQuery(id);
  console.log(data);
  return (
    <div>
      <div className={styles.post_view_container}>
        <div>
          {data?.map((comment:any, index:any) => (
            <>
              <div className={styles.comment_info_container} key={index}>
                <h3>{comment.Name}</h3>
                <p>{comment.Comments}</p>
                
              </div>
            </>
          ))}
          
        </div>
      </div>
    </div>
  );
}
