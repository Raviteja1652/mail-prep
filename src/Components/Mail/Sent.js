import React, { useContext, useState } from 'react'
import AppContext from '../../Store/AppContext'
import './Sent.css'

const FullMessage = ({mailData, onBackClick}) => {
  return (
    <div className='full-sent-msg'>
      <button onClick={onBackClick}>&larr; Back</button>
      <h3>{mailData.subject}</h3>
      <div className='full-sent-msg-detail'>
        <h6>From( yours ): {mailData.senderMail}</h6>
        <h6>To: {mailData.recipientMail}</h6>
      </div>
      <p className='inner-sent-msg'>{mailData.message}</p>
    </div>
  )
}

const Sent = () => {
  const [selectedMail, setSelectedMail] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const ctx = useContext(AppContext)

  const sentClickHandler = (id) => {
    const selected = ctx.sentMails.find(mail => mail.id === id)
    setSelectedMail(selected)
    setViewMode('full')
  }

  const backClickHandler = () => {
    setSelectedMail(null)
    setViewMode('list')
  }

  const sentList = ctx.sentMails.map(mail => (
    <li className='sent-mail' key={mail.id} onClick={() => sentClickHandler(mail.id)}>
      <h5 className='recep-mail'>To: {mail.recipientMail}</h5>
      <span className='subject-message'>{mail.subject} - <span>{mail.message}</span></span>
    </li>
  ))

  const sentCount = ctx.sentMails.length
  return (
    <div className='sent-mails'>
        <h5 className='sent-count'>{sentCount} sent mails</h5><hr />
        {viewMode === 'list' && <ul className='list-style'>{sentList}</ul>}
        {viewMode === 'full' && selectedMail && (
          <FullMessage mailData={selectedMail} onBackClick={backClickHandler} />
        )}
    </div>
  )
}

export default Sent;