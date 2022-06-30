import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = useState('Геральт');
  const [description, setDescription] = useState('Ведьмак');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      titleBtn='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__form-field'>
        <input
          onChange={handleChangeName}
          value={name ? name : ''}
          type='text'
          name='name'
          id='name'
          placeholder='Введите имя'
          autoComplete='off'
          className='popup__input popup__input_type_name'
          required
          minLength={2}
          maxLength={40}
        />
        <span className='popup__error' id='name-error'></span>
      </label>
      <label className='popup__form-field'>
        <input
          onChange={handleChangeDescription}
          value={description ? description : ''}
          type='text'
          name='about'
          placeholder='Введите профессию'
          autoComplete='off'
          className='popup__input popup__input_type_job'
          required
          minLength={2}
          maxLength={200}
          id='job'
        />
        <span className='popup__error' id='job-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
