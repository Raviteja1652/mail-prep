import React, { useContext } from 'react'
import AppContext from '../../Store/AppContext'
import './Sent.css'

const Sent = () => {

  const ctx = useContext(AppContext)

  const sentList = ctx.sentMails.map(mail => (
    <li className='sent-mail'>
      <h5 className='recep-mail'>
        To: {mail.recipientMail}
        <span className='subject-message'>{mail.subject} - {mail.message}</span>
      </h5>
    </li>
  ))

  const sentCount = ctx.sentMails.length
  return (
    <div className='sent-mails'>
        <h5 className='sent-count'>{sentCount} sent mails</h5><hr />
        <ul>{sentList}</ul>
    </div>
  )
}

export default Sent;