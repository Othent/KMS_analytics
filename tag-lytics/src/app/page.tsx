"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <Table />
      </div>
      <Footer />
    </div>
  );
}
