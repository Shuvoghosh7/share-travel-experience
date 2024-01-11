import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import Banner from "@/components/ui/Banner";
import FavouriteDestination from "@/components/ui/FavouriteDestination";
import Serveses from "@/components/ui/Serveses";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Travel",
  description: "This is Hotel Booking System made by next-js",
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <Banner />
      </div>
      <div className="main_body">
        <div>
          <FavouriteDestination/>
        </div>
        <div>
          <Serveses/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
