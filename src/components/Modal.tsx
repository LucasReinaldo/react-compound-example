import { Fragment, createContext, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside, useBoolean } from 'usehooks-ts';

type ModalContext = {
  open: boolean;
  toggle: () => void;
};

const ModalContext = createContext({} as ModalContext);

type ModalProps = {
  children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const { children } = props;

  const { value: open, toggle } = useBoolean();

  const value = {
    open,
    toggle,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Trigger = (props: TriggerProps) => {
  const { children, onClick, ...rest } = props;

  const { toggle } = useModal();

  return (
    <button
      onClick={(e) => {
        toggle();
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

  const { toggle, open } = useModal();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, toggle);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute right-0 top-0 z-10 h-full" {...rest}>
      {children}
    </div>
  );
};

type CloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Close = (props: CloseProps) => {
  const { children, ...rest } = props;

  const { toggle } = useModal();

  return (
    <button onClick={toggle} {...rest}>
      {children}
    </button>
  );
};

type OverlayProps = React.HTMLAttributes<HTMLDivElement>;

const Overlay = (props: OverlayProps) => {
  const { ...rest } = props;

  const { open } = useModal();

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

Modal.Root = Modal;
Modal.Trigger = Trigger;
Modal.Content = Content;
Modal.Portal = Portal;
Modal.Close = Close;
Modal.Overlay = Overlay;

export { Modal as Root, Trigger, Content, Portal, Close, Overlay };
