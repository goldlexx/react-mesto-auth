const InfoTooltip = () => {



  return (
    <div className='popup popup_type_info'>
      <div className='popup__container popup__container_type_info'>

        <div className="popup__image"></div>

        <p className="popup__text">Вы успешно зарегистрировались!</p>

        <button
          className='popup__button-close'
          type='button'
          aria-label='Кнопка закрытия'
          // onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InfoTooltip;
