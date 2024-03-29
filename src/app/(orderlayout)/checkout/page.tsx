/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import styles from "@/style/Product.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/slice/cartSlice";
import React, { useEffect, useState } from "react";
import { Flex, message } from "antd";
import { useAddOrderMutation } from "@/redux/api/order/orderApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";

const CheckoutPage = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const carts = state.carts.carts;
  const [shippingAddress, setShippingAddress] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CreditCard");
  const [subtotalPrice, setSubTotalPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartItemsJSX, setCartItemsJSX] = useState<JSX.Element[]>([]);
  const router = useRouter();

  const calculateSubtotal = () => {
    return carts.reduce((total, item) => {
      return total + item.quantity * item.Price;
    }, 0);
  };

  const calculateTotalPrice = () => {
    return carts.reduce((total, item) => {
      return total + item.quantity * item.Price;
    }, 0);
  };

  let deliveryCharge = 50;
  function calculateTotalprice() {
    const totalPriceWithoutDelivery = calculateTotalPrice();
    const totalPrice = totalPriceWithoutDelivery + deliveryCharge;
    return totalPrice;
  }

  useEffect(() => {
    const calculatedSubTotalPrice = calculateTotalPrice();
    setSubTotalPrice(calculatedSubTotalPrice);
    const calculatedTotalPrice = calculateTotalprice();
    setTotalPrice(calculatedTotalPrice);

  }, [calculateTotalPrice,calculateTotalprice]);

  const [addOrder] = useAddOrderMutation();
  const handlePlaceOrder = async () => {
    const orderDetails = {
      shippingAddress,
      email,
      name,
      phone,
      paymentMethod,
      subtotal: calculateSubtotal(),
      deliveryCharge: 50,
      totalPrice: totalPrice,
      orderItems: carts.map((item) => ({
        product: item.ProductName,
        quantity: item.quantity,
        price: item.Price,
      })),
    };
    try {
      const response = await fetch(
        "https://sharetravelexperienceserver-production.up.railway.app/api/v1/order/create_order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("carts");
        dispatch(clearCart());
        message.success("Thank you,Order Process Complet.Buy Other Product");
        if (response.status === 200) {
          router.push("/product");
        }
      } else {
        // Handle error scenarios
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.log(error);
    }
  };

  const { FullName, Number, email } = getUserInfo() as any;
  useEffect(() => {
    setName(FullName);
    setPhone(Number);
    setUserEmail(useremail);
  }, [FullName, Number, email]);
  return (
    <div className={styles.checkout_main_container}>
      <div className={styles.checkout_container}>
        <div>
          <h2 className="text-2xl font-bold mb-5">Shipping Information</h2>
          <form>
            <label>
              Full Name: <br />
              <input
                type="text"
                value={name}
                readOnly
                className={styles.checkout_input}
              />
            </label>
            <label>
              Phone Number: <br />
              <input
                type="text"
                value={phone}
                readOnly
                className={styles.checkout_input}
              />
            </label>
            <label>
              Email: <br />
              <input
                type="email"
                value={email}
                readOnly
                className={styles.checkout_input}
              />
            </label>
            <label>
              Shipping Address: <br />
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className={styles.checkout_input}
              />
            </label>{" "}
            <br />
            {/* Other necessary input fields for user details */}
          </form>
          <div>
            <h2>Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={styles.checkout_input}
            >
              <option value="select">Select Opthion</option>
              <option value="Cash_On__Delivery">Check On Delevary</option>
              {/* Add more payment options if needed */}
            </select>
          </div>
          <div>
            <button onClick={handlePlaceOrder} className={styles.order_btn}>
              Place Order
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
          {/* Display cart items */}
          <div>
            {
                carts.map((item) => (
                    <Flex
                      justify="space-between"
                      align="center"
                      key={item.id}
                      className={styles.checkout_product_item}
                    >
                      <p>{item.ProductName}</p>
                      <p>
                        {item.Price} * {item.quantity}
                      </p>
                      <p>${(item.quantity * item.Price).toFixed(2)}</p>
                    </Flex>
                  ))
            }
          </div>

          <div className="mx-5 mt-4">
            <p className={styles.total_price}>
              Subtotal: ${subtotalPrice.toFixed(2)}
            </p>
            <p className={styles.total_price}>DeliveryCharge:50</p>
            <p className={styles.total_price}>
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
