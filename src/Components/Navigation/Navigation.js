import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css'
import AppContext from '../../Store/AppContext';

const Navigation = () => {
  const ctx = useContext(AppContext)
  return (
    <div className='navigation-container'>
      <h1>Mail Box</h1>
      <ul>
        <li>
          <Link to='/inbox' onClick={() => ctx.inboxClick()}>Inbox</Link>
        </li>
        <li>
          <Link to='/compose'>Compose</Link>
        </li>
        <li>
          <Link to='/sent' onClick={() => ctx.sentClick()}>Sent</Link>
        </li>
        <li>
          <Link to='/logout' onClick={() => ctx.logout()}>Logout</Link>
        </li>
      </ul>
      <div>{ctx.userMail}</div>
    </div>
  )
}

export default Navigation;