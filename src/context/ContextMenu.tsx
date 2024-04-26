import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type ContextMenuProp = {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
};

const ContextMenuContext = createContext<ContextMenuProp>({} as ContextMenuProp);

const ContextMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState('');
  const close = () => setOpen('');
  
  return (
    <ContextMenuContext.Provider value={{ open, setOpen, close }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

const OpenContext = ({ children, type }: { children: React.ReactElement, type: string }) => {
  const { setOpen } = useContext(ContextMenuContext);
    
  const openContextMenu = () => setOpen(type);

  return (
    React.cloneElement(children, { onClick: openContextMenu })
  );
};

const ContextWindow = ({ children, type }: { children: React.ReactNode, type: string }) => {
  const { open, close } = useContext(ContextMenuContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener('click', handleClose, true);
    return () => {
      document.removeEventListener('click', handleClose);
    }
  }, [close])
  
  
  return open === type ? (
    <div ref={ref}>
      {children}
    </div>
  ) : null;
};


ContextMenu.Open = OpenContext;
ContextMenu.Window = ContextWindow;

export default ContextMenu;
