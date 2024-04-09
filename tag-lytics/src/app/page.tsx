"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import InputBoxes from "../components/InputBoxes";
import ColumnSelector from "../components/ColumnSelector";

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedGateway, setSelectedGateway] = useState(
    "https://arweave-search.goldsky.com/graphql",
  );

  const handleGatewayChange = (gateway: string) => {
    setSelectedGateway(gateway);
  };

  return (
    <div className="container">
      <Header
        searchParams={searchParams}
        onGatewayChange={handleGatewayChange}
      />
      <div className="main-content">
        <InputBoxes />
        <ColumnSelector />
        <Table selectedGateway={selectedGateway} />
      </div>
      <Footer />
    </div>
  );
}
