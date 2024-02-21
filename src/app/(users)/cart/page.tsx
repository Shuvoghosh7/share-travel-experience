/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, ReactElement } from "react";
import CartItem from "@/components/ui/CartItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartState, increaseQuantity } from "@/redux/slice/cartSlice";
import Image from "next/image";

import styles from "@/style/Product.module.css";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";

const Name = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const carts = state.carts.carts;

  const [content, setContent] = useState<any | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = () => {
    return carts.reduce((total, item) => {
      return total + item.quantity * item.Price;
    }, 0);
  };

  useEffect(() => {
    const mappedContent = carts.map((cart) => (
      <CartItem key={cart.id} cart={cart} />
    ));
    setContent(mappedContent);
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [carts]);
  const users = getUserInfo() as any;


  return (
    <div className="cart_main_container">
      <div>{content}</div>
     
      <div className={styles.total_pricie_container}>
        <p className={styles.total_price}>
          Total Price: ${totalPrice.toFixed(2)}
        </p>
       
        {users ? (
          <Link href="/checkout" className={styles.btn_block}>
            Checkout
          </Link>
        ) : (
          <Link href="/Singup" className={styles.btn_block}>
            Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Name;
