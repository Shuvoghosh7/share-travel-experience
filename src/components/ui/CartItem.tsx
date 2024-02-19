import { useAppDispatch } from "@/redux/hooks";
import { decreaseQuantity, increaseQuantity, removeFormCart } from "@/redux/slice/cartSlice";
import Image from "next/image";
import React from "react"
import { MdAdd } from "react-icons/md";
import { IoMdRemove } from "react-icons/io";
import { RiDeleteBack2Fill } from "react-icons/ri";
import styles from "@/style/Product.module.css";
import { Flex } from "antd";
import Link from "next/link";
interface CartItemProps {
    key: any;
    cart: any;
}


const CartItem: React.FC<CartItemProps> = ({ cart }) => {
    const dispatch = useAppDispatch();
    const increaseItemQuantity = (item: { id: any; }) => {
        dispatch(increaseQuantity({
            id: item.id,
            Price: 0,
            ProductName: "",
            quantity: 0,
            createdAt: "",
            productName: "",
            productDescription: "",
            price: 0,
            guideImage: ""
        }));
    };

    const decreaseItemQunaity = (item: { id: any; }) => {
        dispatch(decreaseQuantity({
            id: item.id,
            Price: 0,
            ProductName: "",
            quantity: 0,
            createdAt: "",
            productName: "",
            productDescription: "",
            price: 0,
            guideImage: ""
        }));
    };

    const removeItem = (item: { id: any; }) => {
        dispatch(removeFormCart({
            id: item.id,
            Price: 0,
            ProductName: "",
            quantity: 0,
            createdAt: "",
            productName: "",
            productDescription: "",
            price: 0,
            guideImage: ""
        }));
    };

    // Function to calculate total price for an individual item
    const calculateItemTotalPrice = (item: { quantity: number; Price: number; }) => {
        return item.quantity * item.Price;
    };
    return (

        <div className={styles.cart_item_container}>
            <Flex justify="space-between" align="center">
                <Image
                    src={cart.GuideImage}
                    width={70}
                    height={70}

                    alt="Picture of the author"
                />
                <p>{cart.ProductName}</p>

                <Flex justify="space-between" align="center">
                    <button onClick={() => increaseItemQuantity(cart)}>
                        <MdAdd/>
                    </button>
                    <p className={styles.product_quentity}>{cart.quantity}</p>
                    <button onClick={() => decreaseItemQunaity(cart)}>
                        <IoMdRemove />
                    </button>
                </Flex>
                <p> {calculateItemTotalPrice(cart).toFixed(2)} tk</p>
                <button onClick={() => removeItem(cart)}>
                    <RiDeleteBack2Fill className="text-red-600" />
                </button>
            </Flex>
        </div>





    )
};

export default CartItem;
