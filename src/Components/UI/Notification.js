import React from 'react'
import './Notification.css'

const Notification = ({status, title, message}) => {
  return (
    <div className={`notification ${status}`}>
        <h4>{title}</h4>
        <p>{message}</p>
    </div>
  )
}

export default Notification;