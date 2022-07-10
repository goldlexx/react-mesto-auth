import logo from '../images/header-logo.svg';

const Header = ({ handleLogout, email }) => {
  return (
    <header className='header'>
      <img src={logo} alt='Логотип' className='header__logo' />
      <div className='header__info'>
        <p className='header__email'>{email}</p>
        <button className='header__btn' onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;
