"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Drawer } from '../Drawer';
import styles from './Navbar.module.css';
import { IconButton } from '../IconButton';

export function Navbar() {
  // search is handled by the separate Searchbar component
  const [open, setOpen] = useState(false);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const openDrawer = () => {
    // store the currently focused element to restore focus on close
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    // restore focus if we captured an element
    try {
      lastActiveRef.current?.focus?.();
    } catch {
      // ignore focus errors
    }
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <div className={styles.mobileOnly}>
          <IconButton aria-label="Open menu" icon="menu" onClick={openDrawer} />
        </div>
        <Image src="/logo.luxe.svg" alt="Luxe logo" className={styles.logo} width={120} height={32} priority />

        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.link} href="#">Novedades</a>
          <a className={styles.link} href="#">Hombre</a>
          <a className={styles.link} href="#">Mujer</a>
          <a className={styles.link} href="#">Accesorios</a>
          <a className={styles.link} href="#">Ofertas</a>
        </nav>
      </div>

      <div className={styles.right}>
        <IconButton aria-label="Open account" icon="user" />
        <IconButton aria-label="Open wishlist" icon="heart" />
        <IconButton aria-label="Open cart" icon="shopping-cart" />
      </div>

      <Drawer open={open} onClose={closeDrawer}>
        <nav className={styles.drawerNav} aria-label="Mobile">
          <a className={styles.link} href="#" onClick={closeDrawer}>
            Novedades
          </a>
          <a className={styles.link} href="#" onClick={closeDrawer}>
            Hombre
          </a>
          <a className={styles.link} href="#" onClick={closeDrawer}>
            Mujer
          </a>
          <a className={styles.link} href="#" onClick={closeDrawer}>
            Accesorios
          </a>
          <a className={styles.link} href="#" onClick={closeDrawer}>
            Ofertas
          </a>
        </nav>
      </Drawer>
    </header>
  );
}
