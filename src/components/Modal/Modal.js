import css from './modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ closeModal, img }) => {
  useEffect(() => {
    const onKeyPressed = e => {
      if (e.keyCode === 27) {
        closeModal('close');
      }
    };
    document.addEventListener('keydown', onKeyPressed);

    return () => document.removeEventListener('keydown', onKeyPressed);
  }, [closeModal]);

  return (
    <div
      className={css.Overlay}
      onClick={evt => {
        closeModal(evt.target.className);
      }}
    >
      <div className={css.Modal}>
        <img src={img} alt="" width="800" height="600" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
