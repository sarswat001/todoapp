import React from 'react'
import '../stylesheets/GetTodo.css'

export default function GetTodo(props) {
  return (
    <div className='getTodo-container'>
      <p className='todo-title'>{props.title}</p>
      <p className='todo-description'>{props.description}</p>
      <div className="button-container">
        <button className='edit'>Edit</button>
        <button className='delete'>Delete</button>
      </div>
    </div>
  )
}
