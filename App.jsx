import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'


function App() {


  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [input, setinput] = useState('');
  const passwordref = useRef(null)
  console.log(number)


  const passwordGenerator = useCallback(() => {
    let pass = '';

    let string = "AQWSZXCDERFVBGTYHNUJMIKOLPqazxswedcvfrtgbnhyujmkimiolp";
    if (number) { string += '0123456789' };
    if (character) { string += '!@#$%^&*|><?' };
    for (let i = 1; i < length; i++) {
      let rand = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(rand);
    }


    setinput(pass)

  }, [length, number, character, setinput])

  const copypassword = useCallback(() => {
    window.navigator.clipboard.writeText(input);
  }, [input])


  useEffect(() => {
    passwordGenerator()
  }, [number, character, length, passwordGenerator])


  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 PY-5 my-8
     text-orange-500 bg-gray-600
    '>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={input}
            placeholder='password'
            className='outline-none w-full py-2 my-4 rounded-lg px-3'
            readOnly
            ref={passwordref}></input>

          <button onClick={copypassword} className='outline-none bg-blue-700 text-white px-3   rounded shrink-0'>Copy</button>


        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center '>
            <input onChange={(e) => setlength(e.target.value)}
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer py-1'>

            </input>
            <label>Length:{length}</label>
          </div>


          <div className='flex items-center '>
            <input onChange={() => {
              setnumber(!number);
            }}
              type="checkbox"
              defaultChecked={number}
              className='cursor-pointer py-1'>


            </input>
            <label>NUMBER</label>

          </div>


          <div className='flex items-center '>
            <input onChange={() => {
              setcharacter(!character);
            }}
              type="checkbox"
              defaultChecked={character}
              className='cursor-pointer py-1'>

            </input>
            <label>CHARACTER</label>

          </div>

        </div>

      </div>
    </>

  )
}

export default App
