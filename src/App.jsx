import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import GetTodo from './components/GetTodo'

function App() {
  const [todos, setTodos] = useState([{
    title:'title',
    description:'description'
  }])

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch('http://localhost:3000/todos')
      const jsonData = await response.json()
      console.log(jsonData)
      setTodos(jsonData)
    }
    fetchData();
  },[])

  const updateTodos = (newTodo)=>{
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  }
  return (
    <>
      <div className='container'>
        <h1>Easy Todo App</h1>
        <div className="todo2-container">
          <CreateTodo key={Math.ceil(Math.random()*1000)} updateTodos={updateTodos}/>
          <h3>TODOs</h3>
          {todos.map((todo)=>{
            return <GetTodo key={todo.id} title={todo.title} description={todo.description}/>
          })}
        </div>
      </div>
    </>
  )
}

export default App
