import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

const Register = ({ onRegister  }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    onRegister(email, password);
  };

  return (
    <>
      <header className='header'>
        <img src={logo} alt='Логотип' className='header__logo' />
        <Link to='/sign-in' className='header__btn'>
          Войти
        </Link>
      </header>
      <main>
        <section className='authorization'>
          <form
            action='#'
            className='authorization__form'
            onSubmit={handleSubmit}
          >
            <fieldset className='authorization__content'>
              <h2 className='authorization__title'>Регистрация</h2>

              <label className='authorization__form-field'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  className='authorization__input'
                  onChange={handleChange}
                  value={data.email}
                  minLength='5'
                  maxLength='40'
                  required
                />
              </label>
              <label className='authorization__form-field'>
                <input
                  type='password'
                  name='password'
                  placeholder='Пароль'
                  autoComplete='off'
                  className='authorization__input'
                  onChange={handleChange}
                  value={data.password}
                  minLength='5'
                  maxLength='40'
                  required
                />
              </label>
              <button type='submit' className='authorization__submit-button'>
                Зарегистрироваться
              </button>
            </fieldset>
          </form>
        </section>
      </main>
      <section className='question'>
        <p className='question__text'>Уже зарегистрированы?</p>
        <Link to='/sign-in' className='question__login'>
          Войти
        </Link>
      </section>
    </>
  );
};

export default Register;
