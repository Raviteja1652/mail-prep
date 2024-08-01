import React, { useContext, useRef, useState } from 'react';
import './Auth.css';
import axios from 'axios';
import AppContext from '../../Store/AppContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef()
  const ctx = useContext(AppContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredPass = passwordRef.current.value
    const userCred = {
      email: enteredEmail,
      password: enteredPass,
      returnSecureToken: true
    };
    const changedMail = enteredEmail.replace('@', '').replace('.', '').replace('.', '').replace('.', '')
    setIsLoading(true)

    let url = ''
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDAQiZzzpwYaAlySsjnq51_GhGolj3OeE'
    };

    try {
      const res = await axios.post(url, userCred);
      const data = await res.data
      console.log(data)
      ctx.login(data.idToken, changedMail, enteredEmail)
    } catch (error) {
      console.log(error)
      alert(error)
    }

    setIsLoading(false)
  }

  const toggleHandler = () => {
    setIsLogin(prev => !prev)
  }

  return (
    <section className='auth-form'>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={submitHandler}>
          <div className='control'>
            <input type='email' id='email' ref={emailRef} placeholder='Enter your Email' required></input>
          </div>
          <div className='control'>
            <input type='password' id='password' minLength='7' placeholder='Enter your password' ref={passwordRef} required></input>
          </div>
          <div className='actions'>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Sign up'}</button>}
            <button type='button' className='toggle' onClick={toggleHandler}>{isLogin ? 'Create new Account' : 'Login with existing account'}</button>
          </div>
      </form>
    </section>
  )
}

export default Auth;