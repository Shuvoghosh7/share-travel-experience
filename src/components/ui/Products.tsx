"use client";
import { ProductsType } from "@/types";
import Image from "next/image";
import {
  ShoppingOutlined,
  FundViewOutlined
} from "@ant-design/icons";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import styles from "@/style/Product.module.css";
import { useState } from "react";
import { Flex } from "antd";
import Popup from "../Popup/Popup";
import { useAppDispatch } from "@/redux/hooks";
import { addToCarts } from "@/redux/slice/cartSlice";



const Products = ({ item }: ProductsType) => {
  const { id, ProductName, GuideImage, ProductDescription, Price } = item;
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const handleLearnMoreClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const addToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    dispatch(addToCarts(item));
  };
  const content = (
    <div>
      <Image
        src={GuideImage}
        width={300}
        height={300}
        className={styles.popup_product_img}
        alt="Picture of the author"
      />
      <h1>{ProductName}</h1>
      <p>Price:{Price}</p>
      <p>Description:</p>
      <p>{ProductDescription}</p>

    </div>
  );
  return (
    <div className={styles.show_product_container}>
      <Image
        src={GuideImage}
        width={300}
        height={300}
        className={styles.product_img}
        alt="Picture of the author"
      />
      <div className={styles.product_description}>
        <h1>{ProductName}</h1>
        <p>Price:{Price}TK</p>

        <Flex justify="space-between">
          <button onClick={handleLearnMoreClick}>
            <HiViewfinderCircle className={styles.product_icon} />
          </button>
          <button onClick={addToCart}>
            <ShoppingOutlined className={styles.product_icon} />
          </button>

        </Flex>

      </div>

      {showPopup && <Popup content={content} onClose={handleClosePopup} />}
    </div>
  );
};

export default Products;
