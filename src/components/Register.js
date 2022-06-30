import logo from '../images/header-logo.svg';

const Register = () => {
  return (
    <>
      <header className='header'>
        <img src={logo} alt='Логотип' className='header__logo' />
        <button className='header__open-btn'>Войти</button>
      </header>
      <main>
        <form action='#' className='register__form'>
          <fieldset className='register__content'>
            <h2 className='register__title'>Регистрация</h2>

            <label className='register__form-field'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                autoComplete='off'
                className='register__input'
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
                required
              />
            </label>
            <button type='submit' className='register__submit-button'>Зарегистрироваться</button>
          </fieldset>
        </form>
        <p className='register__question'>Уже зарегистрированы?</p>
        <button className='register__enter'>Войти</button>
      </main>
    </>
  );
};

export default Register;
