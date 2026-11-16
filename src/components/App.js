import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import * as apiAuth from '../utils/apiAuth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('practicum@yandex.ru');
  const [IsInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [apiError, setApiError] = useState('');
  const handleApiError = useCallback((error) => {
    setApiError(error?.message || 'The Mesto API request failed.');
  }, []);
  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;

    apiAuth
      .checkToken(jwt)
      .then((res) => {
        if (res) setLoggedIn(true);
      })
      .catch(handleApiError);
  }, [handleApiError]);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    IsInfoToolTipOpen ||
    selectedCard.link;

  useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch(handleApiError);
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(handleApiError);
  }, [handleApiError]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoToolTipOpen(false);
  };

  const setStateCards = (id, newCard) => {
    setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const onRegister = (email, password) => {
    apiAuth
      .register(password, email)
      .then((data) => {
        setMessage(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setMessage(false);
        handleApiError(err);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  };

  const onLogin = (email, password) => {
    apiAuth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
        }
        setEmail(email);
        setLoggedIn(true);
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch(handleApiError);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .removeLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch(handleApiError);
    } else {
      api
        .addLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch(handleApiError);
    }
  };

  const handleUpdateUser = (card) => {
    api
      .setUserInfo(card)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleApiError);
  };

  const handleUpdateAvatar = (card) => {
    api
      .setUserAvatar(card.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleApiError);
  };

  const handleUpdateCards = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleApiError);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        {apiError ? (
          <p className='api-error' role='alert'>
            {apiError} Check the API configuration and try again.
          </p>
        ) : null}
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header onSignOut={onSignOut} email={email} toLink={'/'} textLink={'Выйти'} />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path='/sign-up'
            element={<Register onRegister={onRegister} />}
          />
          <Route path='/sign-in' element={<Login onLogin={onLogin} />} />
          <Route
            path='*'
            element={
              loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleUpdateCards}
        />

        <PopupWithForm
          name='confirm-delete'
          title='Вы уверены?'
          titleBtn='Да'
          isOpen={false}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          IsInfoToolTipOpen={IsInfoToolTipOpen}
          message={message}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
