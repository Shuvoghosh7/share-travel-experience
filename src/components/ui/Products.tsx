"use client";
import { ProductsType } from "@/types";
import Image from "next/image";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import styles from "@/app/style/Product.module.css";
import { useState } from "react";
const Products = ({ item }: ProductsType) => {
  const { id, ProductName, GuideImage, ProductDescription, Price } = item;
  const [showPopup, setShowPopup] = useState(false);
  const handleLearnMoreClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="mt-5">
      <Image
        src={GuideImage}
        width={300}
        height={300}
        className={styles.product_img}
        alt="Picture of the author"
      />
      <div className={styles.show_product_container}>
        <h1>{ProductName}</h1>
        <p>Price:{Price}TK</p>
        <div className="flex justify-between aline-center p-5">
          <button onClick={handleLearnMoreClick}>
            <HiViewfinderCircle className="text-2xl" />
          </button>
          <button >
            <FaCartPlus className="text-2xl" />
          </button>
        </div>
      </div>

      {/* {showPopup && <Popup content={content} onClose={handleClosePopup} />} */}
    </div>
  );
};

export default Products;
