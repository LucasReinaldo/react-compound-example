import { Fragment, createContext, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside, useBoolean } from 'usehooks-ts';

type DrawerContext = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  toggle: () => void;
};

const DrawerContext = createContext({} as DrawerContext);

type DrawerProps = {
  children: React.ReactNode;
};

const Drawer = (props: DrawerProps) => {
  const { children } = props;

  const { value: open, toggle, setFalse, setTrue } = useBoolean();

  const value = {
    open,
    toggle,
    onClose: setFalse,
    onOpen: setTrue,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }

  return context;
};

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Trigger = (props: TriggerProps) => {
  const { children, onClick, ...rest } = props;

  const { onOpen } = useDrawer();

  return (
    <button
      onClick={(e) => {
        onOpen();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

type ContentProps = React.HTMLAttributes<HTMLDivElement>;

const Content = (props: ContentProps) => {
  const { children, ...rest } = props;

  const { onClose, open } = useDrawer();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      className="absolute right-0 top-0 z-10 h-full"
      {...rest}
    >
      {children}
    </div>
  );
};

type CloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Close = (props: CloseProps) => {
  const { children, ...rest } = props;

  const { toggle } = useDrawer();

  return (
    <button onClick={toggle} {...rest}>
      {children}
    </button>
  );
};

type OverlayProps = React.HTMLAttributes<HTMLDivElement>;

const Overlay = (props: OverlayProps) => {
  const { ...rest } = props;

  const { open } = useDrawer();

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden bg-black bg-opacity-20"
      {...rest}
    />
  );
};

type PortalProps = React.HTMLAttributes<HTMLDivElement> & {
  container?: Element;
};

const Portal = (props: PortalProps) => {
  const { container = globalThis.document.body, ...rest } = props;

  if (!container) return null;

  return createPortal(<Fragment {...rest} />, container);
};

Drawer.Root = Drawer;
Drawer.Trigger = Trigger;
Drawer.Content = Content;
Drawer.Portal = Portal;
Drawer.Close = Close;
Drawer.Overlay = Overlay;

export { Drawer as Root, Trigger, Content, Portal, Close, Overlay };
