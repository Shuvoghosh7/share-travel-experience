import styles from "@/style/Serves.module.css";
import ds1 from "../../assets/DS/service3.jpg";
import ds2 from "../../assets/DS/service1.jpg";
import ds3 from "../../assets/DS/service2.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Serveses() {
  return (
    <div className={styles.destination_container}>
      <h2>OUR SERVES</h2>

      <div className={styles.serves_container}>
        {/* guid  */}
        <div className={styles.serves_contain}>
          <div>
            <Image
              src={ds1}
              width={100}
              height={100}
              alt="Picture of the author"
              className={styles.auto_ds}
            />
            <h4>Provide Tour Guide</h4>
            <div className={styles.survice_btn}>
              <Link
                href="/guide"
                className={styles.btn_block}
              >
                Booked Guide
              </Link>
            </div>
          </div>
        </div>

        {/* travle  */}
        <div className={styles.serves_contain}>
          <div>
            <Image
              src={ds2}
              width={100}
              height={100}
              alt="Picture of the author"
              className={styles.auto_ds}
            />
            <h4>Provide Transport</h4>
            <p>
              <strong>Contact:</strong> 01772385111
            </p>
          </div>
        </div>

        {/* product  */}
        <div className={styles.serves_contain}>
          <div>
            <Image
              src={ds3}
              width={100}
              height={100}
              alt="Picture of the author"
              className={styles.auto_ds}
            />
            <h4>Travel Products</h4>
            <div className={styles.survice_btn}>
              <Link href="/product" className={styles.btn_block}>
                Buy Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
