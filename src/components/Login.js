import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

const Login = ({handleLogin}) => {
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
    handleLogin(email, password);
  };

  return (
    <>
      <header className='header'>
        <img src={logo} alt='Логотип' className='header__logo' />
        <Link to="/sign-up" className='header__btn'>Регистрация</Link>
      </header>
      <main>
        <section className='authorization'>
          <form action='#' className='authorization__form'  onSubmit={handleSubmit}>
            <fieldset className='authorization__content'>
              <h2 className='authorization__title'>Вход</h2>

              <label className='authorization__form-field'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  className='authorization__input'
                  onChange={handleChange}
                  value={data.email}
                  minLength="5"
                  maxLength="40"
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
                  minLength="5"
                  maxLength="40"
                  required
                />
              </label>
              <button type='submit' className='authorization__submit-button'>
                Войти
              </button>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
