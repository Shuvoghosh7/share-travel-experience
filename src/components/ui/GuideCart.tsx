import { GuideType } from "@/types";
import styles from "@/style/Guide.module.css";
import Image from "next/image";
import Link from "next/link";
import { Card } from "antd";
const { Meta } = Card;
const GuideCart = ({ item }: GuideType) => {
  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={
          <Image
            src={item.GuideImage}
            width={250}
            height={250}
            alt="Picture of the author"
            className={styles.guid_image}
          />
        }
        className={styles.allguide_cart_contain}
      >
        
        <div className={styles.cart_text}>
        <Meta title={item.Name} />
          <p>Coverage Area:</p>
          <h6>{item.CoverageArea}</h6>
          <h5>Price Per Day:{item.PricePerDay} </h5>
          <div className="mx-5">
            <Link href={`/guide/${item.id}`} className={styles.btn_block}>
              Booked Now
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GuideCart;
