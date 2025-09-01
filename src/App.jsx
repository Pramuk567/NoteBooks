import { useState, useEffect } from 'react'
import Navbar from './component/Navbar'
import Logo from './component/logo';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import myimg from './assets/me.jpg'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])


  const saveTOLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }

  const toggleFinsished = (e) => {
    setshowfinished(!showfinished)
  }



  const handleEdit = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id == id
    });
    setTodo(newTodos[0].todo)

    let det = todos.filter(item => {
      return item.id !== id
    });
    setTodos(det)
    saveTOLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTOLS()

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo([""])
    saveTOLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {

    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTOLS()

  }


  return (
    <>
      <Navbar />
      <div className='mx-1 container sm:mx-auto my-2 rounded-xl shadow-lg p-5 bg-amber-950 text-white min-h-[80vh] sm:w-1/2'>
        <h1 className='font-bold text-center text-lg'>iTask - Manage your tools at one place</h1>
        <div className="flex">
          <img src={myimg} className='h-[36px] w-[29px] bg-blend-darken gap-0 ml-15 mr-2 rounded-full' alt="" />
        <p className=' mx-2 opacity-75 text-md py-1'>By: Pramukh Chaurasiya</p>
        </div>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold mx-3'> Add a Note </h2>

          <div className="flex">
          <input onChange={handleChange} value={todo} className='bg-gray-400 w-full rounded-md px-5 py-1' placeholder='Write the note' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 disabled:bg-violet-400 hover:bg-violet-800 cursor-pointer p-3 py-2 mx-2 text-md font-medium text-white rounded-full'>Save</button>

          </div>
        </div>
        <input onChange={toggleFinsished} id='show' type="checkbox" checked={showfinished} /> 
        <label className='mx-2' htmlFor='show'>Show Finished</label>
        <div className="h-[1px] bg-black opacity-30 w-[90%] mx-auto my-2"></div>
        <h2 className='text-lg font-bold'>Your Note</h2>
        <div className="todos bg-[#521111] rounded-md">
          {todos.length === 0 && <div className='m-2 text-center'>Empty Note <Logo/> </div>}
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-2 w-1/1 break-words px-2 py-2 border border-2px solid black rounded-md hover:bg-gray-400 justify-between">
              <div className="flex gap-5">

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-100 hover:bg-gray-400 cursor-pointer p-2 py-1 text-sm font-bold text-black rounded-md mx-1'><CiEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-100 hover:bg-gray-400 cursor-pointer p-2 py-1 text-sm font-bold text-black rounded-md mx-1'><MdDelete />
                </button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
