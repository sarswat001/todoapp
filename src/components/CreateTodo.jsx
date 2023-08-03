import React, { useState } from 'react';
import '../stylesheets/CreateTodo.css';

export default function CreateTodo(props) {

  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');

  const createTodo = async ()=>{
    const response = await fetch("http://localhost:3000/todos", {
                        method: "POST",
                        body: JSON.stringify({
                            title,
                            description
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                      })
    const jsonData = await response.json();
    props.updateTodos(jsonData);
    setTitle('');
    setDescription('');
    console.log(jsonData);
  }

  return (
    <div className='createTodo-container'>
      <div className="createTodo-one">
        <p className='header'>Create Todo</p>
      </div>
      <div className="createTodo-two">
        <div className="title">
          <div className="title1">Title</div>
          <div className="title2"><input type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder='Enter title..'/></div>
        </div>
        <div className="description">
          <div className="description1">Description</div>
          <div className="description2"><input type="text" value={description} onChange={(event)=>{setDescription(event.target.value)}} placeholder='Enter description..'/></div>
        </div>
      </div>
      <div className="createTodo-three">
        <button className='create' onClick={createTodo}>CREATE</button>
      </div>
    </div>
  )
}
