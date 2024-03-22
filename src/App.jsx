import { useState, useCallback, useEffect, useRef } from "react"

const App = () => {
  const [length, setLength] = useState(8)
  const [allowNum, setAllowNum] = useState(false)
  const [allowChar, setAllowChar] = useState(false)
  const [password, setPassword] = useState('') 

  let passGenerator = useCallback(()=>{
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz'
    let pass = ''
    let num = '0123456789'
    let char = '!@#$%^&*()'
    if(allowNum) str += num
    if(allowChar) str += char
    for (let i=1; i<=length; i++) {
      let index = Math.floor(Math.random()*str.length+1)
      let character = str.charAt(index)
      pass +=character
    }
    setPassword(pass)
  }, [length, allowNum, allowChar])

  useEffect(()=>{
    passGenerator()
  } , [length, allowNum, allowChar])

  let passRef = useRef(null)
  let copyPassword = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="bg-black w-full flex flex-col items-center h-screen">
      <h1 className="text-white text-[3vw] underline font-bold"> Password Generator </h1>
      <div className="w-[60vw] h-[10vw] relative bg-zinc-600 rounded-lg mt-[5vw] flex flex-col items-center">
        <div className="bg-white w-[90%] h-[40%] flex justify-between items-center rounded-xl mt-2 px-[0vw]"> <input type="text" ref={passRef} readOnly placeholder="password" value={password} className="w-[100%] outline-none ml-[1vw] p-2 text-lg text-[#D86F30] font-extrabold" />    <span onClick={copyPassword} className="bg-[#1B49D7] text-white p-[1.07vw] px-6 cursor-pointer rounded-xl"> Copy </span> </div>
        <div className="capitalize font-bold text-lg text-[#D86F30] flex justify-around items-center py-[2vw] gap-6">
          <div> <input onChange={(e)=> setLength(e.target.value)} type="range" min={8} max={50} value={length} /> </div>
          <label> Range ({length}) </label>
          <div> <input defaultChecked={allowNum} onChange={()=>setAllowNum((prev)=>!prev)} type="checkbox"/> <span> numbers </span> </div>
          <div> <input defaultChecked={allowChar} onChange={()=>setAllowChar((prev)=>!prev)} type="checkbox"/> <span> characters </span> </div>
        </div>
      </div>
    </div>
  )
  
  }

export default App