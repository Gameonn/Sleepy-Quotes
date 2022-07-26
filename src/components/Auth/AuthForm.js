import { useState, useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import classes from './AuthForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const loginSignUpUser = (email, password, route) => {
    console.log(process.env.REACT_APP_API_KEY, process.env.API_KEY);
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${route}?key=${process.env.REACT_APP_API_KEY}`, 
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true}),
      header: { 'Content-Type': 'application/json' }
    }).then(res => {
      setIsLoading(false);
      console.log(res);
      
      if(res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication Failed';
          if(data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
    }).then(data => {
      console.log(data, 'res json');
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace('/')
    }).catch(err => alert(err.message) );
  }

  const submitHandler = (evt) => {
    evt.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let route = (isLogin) ? 'signInWithPassword' : 'signUp';
    loginSignUpUser(enteredEmail, enteredPassword, route);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button className='btn'>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <LoadingSpinner />}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
