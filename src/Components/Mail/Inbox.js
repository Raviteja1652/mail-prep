import React, { useContext, useRef, useState, useEffect } from 'react'
import AppContext from '../../Store/AppContext';
import './Inbox.css';

const FullMessage = ({mailData, onBackClick, onDelete}) => {
  return (
    <div className='full-msg'>
      <button onClick={onBackClick}>&larr; Back</button>
      <button className='delete-button' onClick={() => onDelete(mailData.id)}>Delete</button>
      <h3>{mailData.subject}</h3>
      <div className='full-msg-detail'>
        <h6>From: {mailData.recipientMail}</h6>
        <h6>To: {mailData.senderMail}</h6>
      </div>
      <p className='inner-inbox-message'>{mailData.message}</p>
    </div>
  )
}

const Inbox = () => {
  const [selectedInbox, setSelectedInbox] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const selectedFilterRef = useRef('all')
  const ctx = useContext(AppContext)

  useEffect(() => {
    const intervalId = setInterval(() => {
      ctx.inboxClick()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const inboxClickHandler = id => {
    const selectedMail = ctx.inboxMails.find(mail => mail.id === id)
    ctx.readMail(id)
    setSelectedInbox(selectedMail)
    setViewMode('full')
  };
  const backClickHandler = () => {
    setSelectedInbox(null)
    setViewMode('list')
  };
  const deleterHandler = id => {
    alert('Are you sure you want to delete this Mail')
    ctx.deleteMail(id)
    setSelectedInbox(null)
    setViewMode('list')
  }


  const inboxList = ctx.inboxMails.map(mail => (
    <li className='inbox-mail' key={mail.id} onClick={() => inboxClickHandler(mail.id)}>
      <p className={mail.isRead ? 'read' : 'unread'} />
      <h5 className='sender-mail'>{mail.senderMail}</h5>
      <span className='subject-message-inbox'>{mail.subject} - <span>{mail.message}</span></span>
    </li>
  ))

  const inboxCount = ctx.inboxMails.length
  return (
    <div className='inbox-mails'>
        <div className='filter-count'>
          <select className='inbox-filter' ref={selectedFilterRef} onChange={() => ctx.changeInboxMails(selectedFilterRef.current.value)}>
            <option value='all'>All</option>
            <option value='read'>Read</option>
            <option value='unread'>Unread</option>
          </select>
          <h5 className='mail-count'>{inboxCount} mails</h5>
        </div><hr />
        {viewMode === 'list' && <ul className='ul-lifeStyle'>{inboxList}</ul>}
        {viewMode === 'full' && selectedInbox && (
          <FullMessage mailData={selectedInbox} onBackClick={backClickHandler} onDelete={deleterHandler} />
        )}
    </div>
  )
}

export default Inbox;