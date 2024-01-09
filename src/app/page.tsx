import Navbar from "@/components/share/Navbar";
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
      <div className="main_body">
        <h1>All Page</h1>
        <p>lorem2000</p>
      </div>
    </div>
  );
}
