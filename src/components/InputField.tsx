import React, { useRef } from 'react'
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addHandler: (e:React.FormEvent) => void;
}

const InputField:React.FC<Props> = ({todo, setTodo, addHandler}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={(e) => {addHandler(e);inputRef.current?.blur();}}>
      <input 
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input" 
        placeholder='Enter a task' 
        className='input__box' 
      />
      <button 
        className="input__submit" 
        type='submit'
      >Add</button>
    </form>
  )
}

export default InputField