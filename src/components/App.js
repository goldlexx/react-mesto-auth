import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    _id: '',
  });

  useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.error(err));
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {};

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };

  const setStateCards = (id, newCard) => {
    setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
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

  const handleRegister = (email, password) => {
    auth
      .register(password, email)
      .then((data) => {

        // setUserData({
        //   email: data.email,
        //   _id: data.id
        // });
        setLoggedIn(true);
        navigate('/sign-in');
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = (email, password) => {
    auth.authorize(email, password).then((res) =>{
      if (res.token) {
        localStorage.setItem('jwt', res.token)
      }
      navigate('/');
    })
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .removeLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .addLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = (card) => {
    api
      .setUserInfo(card)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (card) => {
    api
      .setUserAvatar(card.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCards = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header />
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
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path='/sign-in' element={<Login handleLogin={handleLogin}/>} />
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

        <InfoTooltip />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
