import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeImage }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeImageModal);
    return () => {
      document.removeEventListener('keydown', closeImageModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeImageModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      closeImage();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={closeImageModal}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
Modal.propTypes = {
  closeImage: PropTypes.func.isRequired,
};
