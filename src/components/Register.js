import { Link } from 'react-router-dom';
import { useForm } from '../hoocks/useForm';
import logo from '../images/header-logo.svg';

const Register = ({ onRegister  }) => {
  const controlInput = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = controlInput.values;
    onRegister(email, password);
  };
  console.log(controlInput.values);
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
                  onChange={controlInput.handleChange}
                  value={controlInput.email}
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
                  onChange={controlInput.handleChange}
                  value={controlInput.email}
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
