import React, { useContext, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './Compose.css'
import Card from '../UI/Card';
import AppContext from '../../Store/AppContext';

const Compose = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const recepRef = useRef('')
  const subjRef = useRef('')
  const ctx = useContext(AppContext)

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState)
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const contentState = editorState.getCurrentContent();
    const contentText = contentState.getPlainText();
    // console.log(contentText);
    const creationDate = new Date()

    const mailData = {
      senderMail: ctx.userMail,
      recipientMail: recepRef.current.value,
      subject: subjRef.current.value,
      message: contentText,
      isRead: false,
      date: creationDate,
    };

    ctx.sendMail(mailData)
  }

  return (
    <div className='compose'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='input-boxes'>
            <input placeholder="Enter Receipient's emailId" ref={recepRef} />
            <input placeholder="Enter Subject" ref={subjRef} />
          </div>

          <div className='editor'>
            <Editor 
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbarClassName='toolbarClassName'
              wrapperClassName='wrapperClassName'
              editorClassName='editorClassName'
              placeholder='Enter your message'
            />
          </div>

          <div className='compose-button'>
            <button type='submit'>Send</button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Compose;