"use client";

import { ReactNode, useEffect } from 'react';
import styles from './Drawer.module.css';

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export function Drawer({ open = false, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.drawer}>{children}</div>
    </div>
  );
}
