import React from "react";
import styles from "./components.module.css";
import Image from "next/image";

const Header: React.FC = () => {
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
      <div>Search bar</div>
    </header>
  );
};

export default Header;
