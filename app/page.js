"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HomePage />
      <Footer />
    </main>
  );
}
