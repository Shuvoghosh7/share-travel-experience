import React from "react";
import styles from "@/style/Destination.module.css";
import ds1 from "../../assets/DS/trending3.jpg";
import ds2 from "../../assets/DS/trending2.jpg";
import ds3 from "../../assets/DS/trending9.jpg";
import ds4 from "../../assets/DS/trending5.jpg";
import ds5 from "../../assets/DS/trending6.jpg";
import ds6 from "../../assets/DS/trending8.jpg";
import ds7 from "../../assets/DS/trending14.jpg";
import Image from "next/image";

export default function FavouriteDestination() {
  return (
    <div className={styles.destination_container}>
      <h2>FavouriteDestination</h2>
      <div className={styles.destination_grid_container}>
        <div className={styles.image_conationer}>
          <Image
            src={ds1}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Lalbagh</p>
        </div>

        <div className={styles.image_conationer}>
          <Image
            src={ds2}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Sonargaon</p>
        </div>

        <div className={styles.image_conationer}>
          <Image
            src={ds3}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Cox’sBazar</p>
        </div>

        <div className={styles.image_conationer}>
          <Image
            src={ds4}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Sundarbans</p>
        </div>

        <div className={styles.image_conationer}>
          <Image
            src={ds5}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Srimongol</p>
        </div>

        <div className={styles.image_conationer}>
          <Image
            src={ds6}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Dhaka</p>
        </div>

        <div className={styles.image_conationer}>
          <Image
            src={ds7}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Bandarban</p>
        </div>


        <div className={styles.image_conationer}>
          <Image
            src={ds2}
            width={300}
            height={300}
            alt="Picture of the author"
            className={styles.auto_ds}
          />
          <p>Bagerhat</p>
        </div>

      </div>
    </div>
  );
}
