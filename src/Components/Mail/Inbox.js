import React, { useContext } from 'react'
import AppContext from '../../Store/AppContext';
import './Inbox.css'

const Inbox = () => {

  const ctx = useContext(AppContext)


  const inboxList = ctx.inboxMails.map(mail => (
    <li className='inbox-mail'>
      <h5 className='sender-mail'>
        {mail.senderMail}
        <span className='subject-message'>{mail.subject} - {mail.message}</span>
        {/* <p>{mail.message}</p> */}
      </h5>
    </li>
  ))

  const inboxCount = ctx.inboxMails.length
  return (
    <div className='inbox-mails'>
        <div className='filter-count'>
          <select className='inbox-filter'>
            <option value='all'>All</option>
            <option value='read'>Read</option>
            <option value='unread'>Unread</option>
          </select>
          <h5 className='mail-count'>{inboxCount} mails</h5>
        </div><hr />
        <ul>{inboxList}</ul>
    </div>
  )
}

export default Inbox;