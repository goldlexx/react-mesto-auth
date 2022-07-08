import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import logo from '../images/header-logo.svg';

const Register = ({handleRegister}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;

    handleRegister(email, password);
    // auth.register(password, email).then((res) => {
    //   if (res) {
    //     navigate('/sign-in');
    //   }
    // });
  };

  return (
    <>
      <header className='header'>
        <img src={logo} alt='Логотип' className='header__logo' />
        <Link to="/sign-in" className='header__open-btn'>Войти</Link>
      </header>
      <main>
        <section className='register'>
          <form action='#' className='register__form' onSubmit={handleSubmit}>
            <fieldset className='register__content'>
              <h2 className='register__title'>Регистрация</h2>

              <label className='register__form-field'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  className='register__input'
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </label>
              <label className='register__form-field'>
                <input
                  type='password'
                  name='password'
                  placeholder='Пароль'
                  autoComplete='off'
                  className='register__input'
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </label>
              <button type='submit' className='register__submit-button'>
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
