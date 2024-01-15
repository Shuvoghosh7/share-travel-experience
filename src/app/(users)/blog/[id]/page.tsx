"use client";
import React, { useEffect, useState } from "react";
import styles from "@/style/Blog.module.css";
import { useBlogQuery, useBlogsQuery } from "@/redux/api/blog/blogApi";
import { Col, Flex, Row, message } from "antd";
import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import RecentPost from "@/components/ui/BlogsTypes/RecentPost";
import RelatedPosts from "@/components/ui/BlogsTypes/RelatedPosts";
import Comment from "@/components/ui/BlogsTypes/Comment";
import PostComment from "@/components/ui/BlogsTypes/PostComment";
const BlogDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const query: Record<string, any> = {};

  const { data, isLoading } = useBlogQuery(id);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="main_container">
      <div className={styles.archive_titel}>
        <div className={styles.archive_top_container}>
          <div>
            <Image
              src={data.PostImage}
              width={300}
              height={300}
              className={styles.archive_product_img}
              alt="Picture of the author"
            />
          </div>
          <div style={{ margin: "auto 0px" }}>
            <h1>{data.PostTitle}</h1>
            <div>
              <p>
                POSTED BY : <strong>{data.AuthorName}</strong>
              </p>
              <p style={{marginTop:"10px"}}>
                Post Date : <strong>{data.PostDate}</strong>
              </p>
            </div>
            
          </div>
        </div>
      </div>
      <hr style={{ marginBottom: "40px" }} />

      <div className={styles.archive_container}>
        <div className={styles.right_side}>
          <div className={styles.archive_description}>{data.PostDescription}</div>
          <div>
            <Image
              src={data.PostImage}
              width={500}
              height={500}
              className={styles.archive_product_img}
              alt="Picture of the author"
            />
          </div>
        </div>

        {/* side part of single page  */}
        <div className={styles.left_side}>
          <div>
            <h2>Recent Post</h2>
            <RecentPost />
          </div>
          <div style={{marginTop:"20px"}}>
            <h2>Related Posts</h2>
            <RelatedPosts PostCategory={data.PostCategory} />
          </div>
        </div>
      </div>

      <div className={styles.comment_container}>
        <div>
          <div>
            <Comment id={id} />
          </div>
          <div>
            <PostComment id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
