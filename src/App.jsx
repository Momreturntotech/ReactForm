import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import DynamicForm from './components/DynamicForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Form/>
     <DynamicForm/>
    </>
  )
}

export default App
