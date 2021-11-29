import { useState, useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProfileForm = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const changePassword = (password) => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`, 
    {
      method: 'POST',
      body: JSON.stringify({ idToken: authCtx.token, password, returnSecureToken: false  }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      setIsLoading(false);
      if(res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          console.log(data);
          
          let errorMessage = 'Updation Failed';
          if(data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }).then(data => {
          authCtx.changePassword(data.idToken);
        }).catch(err => alert(err.message) );
      }
    })
  }

  const passwordInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    changePassword(enteredPassword)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        { !isLoading && <button>Change Password</button>}
          {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
}

export default ProfileForm;
