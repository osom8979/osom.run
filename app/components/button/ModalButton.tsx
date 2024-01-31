'use client';

import {Fragment, type HTMLAttributes, type PropsWithChildren, useRef} from 'react';

interface ModalButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  // EMPTY.
}

export default function ModalButton(props: ModalButtonProps) {
  const {children, ...attrs} = props;
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
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Fragment>
  );
}
