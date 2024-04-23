import { X } from './components/X';

import * as Drawer from './components/Drawer';

function App() {
  return (
    <div className="relative flex h-dvh flex-col items-center justify-center gap-8 overflow-hidden">
      <div className="relative flex h-40 w-80 items-center justify-center rounded-lg bg-slate-100">
        <Drawer.Root>
          <Drawer.Trigger className="flex items-center justify-center rounded-lg bg-slate-800 px-4 py-1 font-light text-slate-50">
            Open Drawer
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Content>
              <div className="h-full p-2">
                <div className="relative h-full w-[480px] animate-slide-in-left rounded-lg bg-slate-50">
                  <Drawer.Close className="absolute right-2 top-2">
                    <div className="relative rounded-full bg-slate-200 p-1 text-slate-600">
                      <X />
                    </div>
                  </Drawer.Close>

                  <div className="flex flex-col p-4">
                    <h1 className="text-2xl font-semibold text-slate-900">
                      Drawer
                    </h1>
                  </div>
                  <div className="h-[1px] bg-slate-200" />
                  <div className="flex flex-col p-4">
                    <p className="text-slate-800">
                      This is a Drawer component built with using the compound
                      pattern.
                    </p>
                  </div>
                </div>
              </div>
            </Drawer.Content>
            <Drawer.Overlay />
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}

export default App;
