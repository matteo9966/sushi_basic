import React from "react";
import { Outlet } from "react-router-dom";
import { LogoHeader } from "../../LogoHeader";
import { Footer } from "../../Footer";
import styles from './layout.module.css';
export const Layout: React.FC = (props) => {
  return (
    <div className={styles.layout}>
      <header className={styles['header-style']} >
        <LogoHeader></LogoHeader>
      </header>
      <main className={styles['main-style']}>
        <Outlet></Outlet>
      </main>
      <footer className={styles['footer-style']}>
        <Footer></Footer>
      </footer>
    </div>
  );
};
