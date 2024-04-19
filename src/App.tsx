import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside, useBoolean } from 'usehooks-ts';

type ModalProps = {
  open: boolean;
  toggle: () => void;
};

const ModalComponent = (props: ModalProps) => {
  const { toggle } = props;

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, toggle);

  return (
    <div className="absolute right-0 top-0 flex h-full w-full overflow-hidden bg-black bg-opacity-20">
      <div className="ml-auto p-2">
        <div
          ref={ref}
          className="h-full w-[480px] animate-slide-in-left rounded-lg bg-white p-4 "
        >
          <h1 className="text-xl font-bold">Modal</h1>
          <p>Content</p>
        </div>
      </div>
    </div>
  );
};

const ModalWithPortal = (props: ModalProps) => {
  if (!props.open) return null;

  return createPortal(ModalComponent(props), globalThis.document.body);
};

function App() {
  const { toggle, value: open } = useBoolean();

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center gap-8 overflow-hidden">
      <div className="relative flex h-40 w-80 items-center justify-center rounded-lg bg-slate-100">
        <button
          onClick={() => toggle()}
          className="flex items-center justify-center rounded-lg bg-slate-800 px-4 py-1 font-light text-slate-50"
        >
          Open with Portal
        </button>
        <ModalWithPortal open={open} toggle={toggle} />
      </div>
    </div>
  );
}

export default App;
