import { GuideType } from "@/types";
import styles from "@/style/Guide.module.css";
import Image from "next/image";
import Link from "next/link";
const GuideCart = ({ item }: GuideType) => {
  console.log(item);
  return (
    <div className={styles.allguide_contain}>
      <Image
        src={item.GuideImage}
        width={380}
        height={300}
        alt="Picture of the author"
        className={styles.guid_image}
      />
      <p>{item.Name}</p>
      <p>Coverage Area:</p>
      <h6>{item.CoverageArea}</h6>
      <h5>Price Per Day:{item.PricePerDay} </h5>
      <div className="mx-5">
        <Link href={`/guide/${item.id}`} className={styles.btn_block}>
          Booked Now
        </Link>
      </div>
    </div>
  );
};

export default GuideCart;
