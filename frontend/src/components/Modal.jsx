import CloseIcon from '../images/Close_Icon.svg'; 



const Modal = ({ message, onClose, imageSrc }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <img src={imageSrc} alt="Результат" className="modal__image" />
        <p className="modal__title">{message}</p>
        <img
          src={CloseIcon}
          alt="Закрыть"
          className="modal__close-icon"
          onClick={onClose}
        />
      </div>
    </div>
  );
};



export default Modal;