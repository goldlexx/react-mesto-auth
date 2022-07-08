import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import logo from '../images/header-logo.svg';

const Login = ({handleLogin}) => {
  const navigate = useNavigate();

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
        <Link to="/sign-up" className='header__open-btn'>Регистрация</Link>
      </header>
      <main>
        <section className='register'>
          <form action='#' className='register__form'  onSubmit={handleSubmit}>
            <fieldset className='register__content'>
              <h2 className='register__title'>Вход</h2>

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
