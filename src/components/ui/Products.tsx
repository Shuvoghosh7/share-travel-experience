"use client";
import { ProductsType } from "@/types";
import Image from "next/image";
import { ShoppingOutlined, FundViewOutlined } from "@ant-design/icons";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import styles from "@/style/Product.module.css";
import { useState } from "react";
import { Card, Divider, Flex } from "antd";
import Popup from "../Popup/Popup";
import { useAppDispatch } from "@/redux/hooks";
import { addToCarts } from "@/redux/slice/cartSlice";
import { EyeInvisibleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;


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
      {/* <h1>{ProductName}</h1>
      <p>Price:{Price}</p> */}
      <p>Description:</p>
      <p>{ProductDescription}</p>

    </div>
  );
  return (
    <>
    <div className={styles.show_product_container}>
      <Card
        style={{ width: 300 }}
        cover={
          <Image
            src={GuideImage}
            width={100}
            height={250}
            className={styles.product_img}
            alt="Picture of the author"
          />
        }
        actions={[
          <EyeInvisibleOutlined
            key="setting"
            onClick={handleLearnMoreClick}
            style={{ fontSize: "26px", color: "#8458B3" }}
          />,

          <ShoppingCartOutlined key="ellipsis" onClick={addToCart}  style={{fontSize:"26px",color:"#8458B3"}} />,
        ]}
      >
        <Meta title={ProductName} />
        <h5 style={{ fontSize: "16px", marginTop: "10px" }}>Price:{Price}</h5>
      </Card>
    </div>
    {showPopup && <Popup content={content} onClose={handleClosePopup} />}
  </>
  );
};

export default Products;
