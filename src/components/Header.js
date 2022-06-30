import logo from '../images/header-logo.svg';

const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt='Логотип' className='header__logo' />
    </header>
  );
};

export default Header;
