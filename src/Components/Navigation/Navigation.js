import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css'
import AppContext from '../../Store/AppContext';

const Navigation = () => {
  const ctx = useContext(AppContext)
  const location = useLocation()
  const unReadCount = ctx.inboxMails.filter(mail => !mail.isRead).length
  return (
    <div className='navigation-container'>
      <h1>Mail Box</h1>
      <div className='navigation-links'>
        <ul>
          <li className={location.pathname === '/inbox' ? 'active' : ''}>
            <Link to='/inbox' onClick={() => ctx.inboxClick()}>Inbox</Link>
            <span className='unread-count'>{unReadCount}</span>
          </li>
          <li className={location.pathname === '/compose' ? 'active' : ''}>
            <Link to='/compose'>Compose</Link>
          </li>
          <li className={location.pathname === '/sent' ? 'active' : ''}>
            <Link to='/sent' onClick={() => ctx.sentClick()}>Sent</Link>
          </li>
          <li>
            <Link to='/logout' onClick={() => ctx.logout()}>Logout</Link>
          </li>
        </ul>
        <div className='profile-icon'>{ctx.userMail}</div>
      </div>
    </div>
  )
}

export default Navigation;