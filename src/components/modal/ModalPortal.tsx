import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
}
