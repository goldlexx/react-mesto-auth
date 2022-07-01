import logo from '../images/header-logo.svg';

const LoginPage = ({text, title, btn}) => {
  return (
    <>
      <header className='header'>
        <img src={logo} alt='Логотип' className='header__logo' />
        <button className='header__open-btn'>{text}</button>
      </header>
      <main>
        <section className='register'>


        <form action='#' className='register__form'>
          <fieldset className='register__content'>
            <h2 className='register__title'>{title}</h2>

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
            <button type='submit' className='register__submit-button'>{btn}</button>
          </fieldset>
        </form>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
