'use client';

import {Fragment, type HTMLAttributes, type PropsWithChildren, useRef} from 'react';
import MaterialSymbolsCloseRounded from '@/app/icons/ms/MaterialSymbolsCloseRounded';
import TablerAlertCircle from '@/app/icons/tabler/TablerAlertCircle';

interface ModalButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  title?: string;
  detail?: string;
  ok?: string;
}

export default function ModalButton(props: ModalButtonProps) {
  const {children, title, detail, ok, ...attrs} = props;
  const dialog = useRef<HTMLDialogElement>(null);
  const handlerClick = async () => {
    if (!dialog.current) {
      return;
    }
    dialog.current.showModal();
  };

  return (
    <Fragment>
      <button type="button" role="button" onClick={handlerClick} {...attrs}>
        {children}
      </button>

      <dialog ref={dialog} className="modal">
        <div className="modal-box">
          <div className="flex justify-between w-full">
            <TablerAlertCircle className="w-12 h-12 text-accent" />

            <form method="dialog">
              <button className="btn btn-ghost btn-circle btn-sm">
                <MaterialSymbolsCloseRounded className="w-6 h-6" />
              </button>
            </form>
          </div>

          <div className="mt-4 pl-1 space-y-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <p>{detail}</p>
          </div>

          <div className="modal-action">
            <button className="btn btn-sm btn-accent px-6">
              <p>{ok}</p>
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Fragment>
  );
}
