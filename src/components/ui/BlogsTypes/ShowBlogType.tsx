import styles from "@/style/Blog.module.css";
import Image from "next/image";
import blog1 from "../../../assets/images/LN/blog-post1.jpg";

import Link from "next/link";
import Head from "next/head";
import { BlogType } from "@/types";
import { Card, Flex } from "antd";
const { Meta } = Card;
export default function ShowBlogType({ item }: BlogType) {
  return (
   
      <div className={styles.blog_cart_container}>
        <Card
          hoverable
          style={{ width: 300 }}
          cover={
            <Image
              src={item.PostImage}
              width={300}
              height={300}
              alt="Picture of the author"
              className={styles.img_fluid}
            />
          }
        >
          <Meta
            title={
              <Link href={`/blog/${item.id}`} className={styles.blog_title}>
                {item.PostTitle}
              </Link>
            }
          />
          <p>{item.PostDescription.slice(0, 70)} ....</p>
          <p className={styles.travel_clocation}>
            <strong>Location:</strong> {item.TravelLocation}
          </p>
          <Flex justify="space-between" align="center">
            <h5 className={styles.author_name}>{item.AuthorName}</h5>
            <h5 className={styles.date}>{item.PostDate}</h5>
          </Flex>
        </Card>
      </div>
    
  );
}
