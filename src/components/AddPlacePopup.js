import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onUpdateCards }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleChangeTitle = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateCards({
      name: name,
      link: link,
    });
  };

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      titleBtn='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__form-field'>
        <input
          onChange={handleChangeTitle}
          value={name ? name : ''}
          type='text'
          name='name'
          placeholder='Название'
          autoComplete='off'
          className='popup__input popup__input_type_card-name'
          id='title'
          minLength={2}
          maxLength={30}
          required
        />
        <span className='popup__error' id='title-error'></span>
      </label>
      <label className='popup__form-field'>
        <input
          onChange={handleChangeLink}
          value={link ? link : ''}
          type='url'
          name='link'
          placeholder='Ссылка на картинку'
          autoComplete='off'
          className='popup__input popup__input_type_card-link'
          id='link'
          required
        />
        <span className='popup__error' id='link-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
