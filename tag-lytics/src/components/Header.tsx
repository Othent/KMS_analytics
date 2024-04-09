import React from "react";
import styles from "./components.module.css";
import Image from "next/image";
import SearchBar from "./SearchBar";

interface HeaderProps {
  // @ts-ignore
  searchParams: ReturnType<typeof useSearchParams>;
  onGatewayChange: (gateway: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchParams, onGatewayChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/tag-logo.svg"
          alt="Tag-lytics logo"
          width={50}
          height={20}
          priority
        />
        <h1 className={styles.h1}>Tag-lytics</h1>
      </div>
      <SearchBar
        searchParams={searchParams}
        onGatewayChange={onGatewayChange}
      />
    </header>
  );
};

export default Header;
