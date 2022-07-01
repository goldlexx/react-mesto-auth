import LoginPage from './LoginPage';

const Register = () => {
  return (
    <>
      <LoginPage
        text='Войти'
        title='Регистрация'
        btn='Зарегистрироваться'
      />
      <section className='question'>
        <p className='question__text'>Уже зарегистрированы?</p>
        <button className='question__login'>Войти</button>
      </section>
    </>
  );
};

export default Register;
